package org.enspy.snappy.server.domain.usecases.chat;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.callbacks.SendMessageCallback;
import org.enspy.snappy.server.domain.entities.Attachement;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.helpers.WebSocketHelper;
import org.enspy.snappy.server.infrastructure.repositories.MessageRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.stores.ConnectedUserStore;
import org.enspy.snappy.server.infrastructure.stores.NotSentMessagesStore;
import org.enspy.snappy.server.presentation.dto.chat.SaveAttachementDto;
import org.enspy.snappy.server.presentation.dto.chat.SendMessageDto;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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

    @Autowired
    private SaveAttachementUseCase saveAttachementUseCase;

    @Override
    public Message execute(SendMessageDto dto) {
        log.info("Starting message sending process for project: {}", dto.getProjectId());

        Optional<User> sender = userRepository.findByExternalIdAndProjectId(dto.getSenderId(), dto.getProjectId());
        if (sender.isEmpty()) {
            log.error("Sender not found - senderId: {}, projectId: {}", dto.getSenderId(), dto.getProjectId());
            throw new IllegalArgumentException("Sender not found");
        }
        log.debug("Sender found: {}", sender.get().getId());

        Optional<User> receiver = userRepository.findByExternalIdAndProjectId(dto.getReceiverId(), dto.getProjectId());
        if (receiver.isEmpty()) {
            log.error("Receiver not found - receiverId: {}, projectId: {}", dto.getReceiverId(), dto.getProjectId());
            throw new IllegalArgumentException("Receiver not found");
        }
        log.debug("Receiver found: {}", receiver.get().getId());

        Message message = new Message();
        message.setSender(sender.get());
        message.setReceiver(receiver.get());
        message.setBody(dto.getBody());
        message.setProjectId(dto.getProjectId());


        message = messageRepository.save(message);

        if (dto.getAttachements() != null && !dto.getAttachements().isEmpty()) {
            List<Attachement> attachements =  saveAttachementUseCase.execute(new SaveAttachementDto(message, dto.getAttachements()));
            message.setAttachements(attachements);
        }
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