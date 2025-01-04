package org.enspy.snappy.server.domain.usecases.chat;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.helpers.WebSocketHelper;
import org.enspy.snappy.server.infrastructure.repositories.MessageRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.stores.ConnectedUserStore;
import org.enspy.snappy.server.infrastructure.stores.NotSentMessagesStore;
import org.enspy.snappy.server.presentation.dto.chat.SendMessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class  SendMessageUseCase implements UseCase<SendMessageDto, Void> {

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
    public Void execute(SendMessageDto userId) {
        // Validate sender
        Optional<User> sender = userRepository.findByExternalIdAndProjectId(userId.getSenderId(), userId.getProjectId());
        if (sender.isEmpty()) {
            throw new IllegalArgumentException("Sender not found");
        }

        // Validate receiver
        Optional<User> receiver = userRepository.findByExternalIdAndProjectId(userId.getReceiverId(), userId.getProjectId());
        if (receiver.isEmpty()) {
            throw new IllegalArgumentException("Receiver not found");
        }

        // Create and save the message
        Message message = new Message();
        message.setSender(sender.get());
        message.setReceiver(receiver.get());
        message.setBody(userId.getBody());
        message.setProjectId(userId.getProjectId());

        message = messageRepository.save(message);
        sendMessageToReceiver(message);
        sendMessageToSender(message);

        return null;
    }

    public void sendMessageToReceiver(Message message) {
        String receiverSession = connectedUserStore.getConnectedUserId(message.getReceiver().getId().toString());
        // s'il est connecté
        if (receiverSession != null) {
            SocketIOClient receiver = socketIOServer.getClient(UUID.fromString(receiverSession));
            receiver.sendEvent(WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER, message);
        }
        // S'il n'est pas connecté, on ajoute à la liste des messages qu'il n'a pas lu
        else
            notSentMessagesStore.addUnreadMessageForUser(message.getReceiver().getId().toString(), message);
    }

    public void sendMessageToSender(Message message) {
        String senderSession = connectedUserStore.getConnectedUserId(message.getSender().getId().toString());
        if (senderSession != null) {
            SocketIOClient sender = socketIOServer.getClient(UUID.fromString(senderSession));
            sender.sendEvent(WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER, message);
        }
    }
}