package org.enspy.snappy.services;

import org.enspy.snappy.controllers.dto.CreateMessageDto;
import org.enspy.snappy.models.Message;
import org.enspy.snappy.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message createMessage(CreateMessageDto messageDto) {
        Message message = new Message();
        message.setAuthor(messageDto.getAuthor());
        message.setConversation(messageDto.getConversation());
        message.setContent(messageDto.getContent());
        message.setIsRead(messageDto.getIsRead());
        message.setReplyTo(messageDto.getReplyTo());
        return messageRepository.save(message);
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
