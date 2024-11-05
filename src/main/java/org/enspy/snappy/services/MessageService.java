package org.enspy.snappy.services;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import org.enspy.snappy.controllers.dto.CreateMessageDto;
import org.enspy.snappy.controllers.presenters.GetMessagePresenter;
import org.enspy.snappy.helpers.WebSocketAcknowledges;
import org.enspy.snappy.helpers.WebSocketHelper;
import org.enspy.snappy.models.Conversation;
import org.enspy.snappy.models.Message;
import org.enspy.snappy.repositories.ConversationRepository;
import org.enspy.snappy.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.dao.PersistenceExceptionTranslationAutoConfiguration;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private SocketIOServer socketServer;

    @Autowired
    private MessageService messageService;

    /**
     * [UserUUID]: [sessionId]
     */
    @Autowired
    private Map<String, String> connectedUsers; // <session>: <User>

    public Message createMessage(CreateMessageDto messageDto) {
        Message message = new Message();
        message.setAuthor(messageDto.getAuthor());
        message.setConversation(messageDto.getConversation());
        message.setContent(messageDto.getContent());
        message.setIsRead(messageDto.getIsRead());
        message.setReplyTo(messageDto.getReplyTo());

        Optional<Conversation> conversation = conversationRepository.findById(messageDto.getConversation());
        // Si la conversation n'existe pas, on arrete tout
        if (conversation.isEmpty()) {
            return null;
        }
        Message persistedMessage = messageRepository.save(message);
        conversation.get().getUsers().forEach((userInConversation) -> {
            String userSession = connectedUsers.get(userInConversation.toString());
            if (userSession != null && userInConversation != message.getAuthor()) {
                SocketIOClient socketIOClient = socketServer.getClient(UUID.fromString(userSession));
                socketIOClient.sendEvent(WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER, GetMessagePresenter.fromMessage(message));
            }
        });
        return persistedMessage;
    }

    /**
     * Reccuperer un bloc de messages dans une conversation
     */
    public List<Message> findMessagesForConversation(UUID conversationUuid, UUID fromMessage, int limit) {
        return messageRepository.findMessagesForConversation(conversationUuid, fromMessage, limit);
    }

    /**
     * Recuperer les messages non lus d'une conversation
     */
    public List<Message> findUnreadMessages(UUID conversationUuid, UUID user) {
        List<Message> unreadMessages = messageRepository.findUnreadMessages(conversationUuid, user);

        // marquer ces messages comme lus
//        unreadMessages.stream().forEach((unreadMessage) -> {unreadMessage.setIsRead(true);});
        unreadMessages.stream().forEach((unreadMessage) -> {
            messageRepository.markMessageAdRead(unreadMessage.getUuid());
        });

        return unreadMessages;
    }

    public void markMessageAsRead(UUID messageUuid) {
        messageRepository.markMessageAdRead(messageUuid);
    }
}
