package org.enspy.snappy.server.domain.usecases.chat;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.callbacks.SendMessageCallback;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.helpers.WebSocketHelper;
import org.enspy.snappy.server.infrastructure.repositories.MessageRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.stores.ConnectedUserStore;
import org.enspy.snappy.server.infrastructure.stores.NotSentMessagesStore;
import org.enspy.snappy.server.presentation.dto.chat.SendMessageDto;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@Log4j2
public class SendMessageUseCase implements UseCase<SendMessageDto, Message> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private SocketIOServer socketIOServer;

    @Autowired
    private NotSentMessagesStore notSentMessagesStore;

    @Autowired
    private ConnectedUserStore connectedUserStore;

    @Override
    public Message execute(SendMessageDto userId) {
        log.info("Starting message sending process for project: {}", userId.getProjectId());

        Optional<User> sender = userRepository.findByExternalIdAndProjectId(userId.getSenderId(), userId.getProjectId());
        if (sender.isEmpty()) {
            log.error("Sender not found - senderId: {}, projectId: {}", userId.getSenderId(), userId.getProjectId());
            throw new IllegalArgumentException("Sender not found");
        }
        log.debug("Sender found: {}", sender.get().getId());

        Optional<User> receiver = userRepository.findByExternalIdAndProjectId(userId.getReceiverId(), userId.getProjectId());
        if (receiver.isEmpty()) {
            log.error("Receiver not found - receiverId: {}, projectId: {}", userId.getReceiverId(), userId.getProjectId());
            throw new IllegalArgumentException("Receiver not found");
        }
        log.debug("Receiver found: {}", receiver.get().getId());

        Message message = new Message();
        message.setSender(sender.get());
        message.setReceiver(receiver.get());
        message.setBody(userId.getBody());
        message.setProjectId(userId.getProjectId());

        message = messageRepository.save(message);
        log.info("Message saved with id: {}", message.getId());

        this.sendMessageToReceiver(message);
        this.sendMessageToSender(message);

        log.info("Message sending process completed");
        return message;
    }

    public void sendMessageToReceiver(@NotNull Message message) {
        String receiverId = message.getReceiver().getId().toString();
        String receiverSession = connectedUserStore.getConnectedUserSessionId(receiverId);

        if (receiverSession != null) {
            log.warn("Receiver is connected. Session: {}", receiverSession);
            SocketIOClient receiver = socketIOServer.getClient(UUID.fromString(receiverSession));
            receiver.sendEvent(WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER, new SendMessageCallback(), message);
            log.info("Message sent to receiver. UserId: {}", receiverId);
        } else {
            log.warn("Receiver is offline. Adding to unread messages. UserId: {}", receiverId);
            notSentMessagesStore.addNotSentMessageForUser(receiverId, message);
        }
    }

    public void sendMessageToSender(@NotNull Message message) {
        String senderId = message.getSender().getId().toString();
        String senderSession = connectedUserStore.getConnectedUserSessionId(senderId);

        if (senderSession != null) {
            log.debug("Sender is connected. Session: {}", senderSession);
            SocketIOClient sender = socketIOServer.getClient(UUID.fromString(senderSession));
            sender.sendEvent(WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER, new SendMessageCallback(), message);
            log.info("Message sent to sender. UserId: {}", senderId);
        } else {
            log.warn("Sender is offline. UserId: {}", senderId);
        }
    }
}