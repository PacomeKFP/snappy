package org.enspy.snappy.services;

import org.enspy.snappy.models.Conversation;
import org.enspy.snappy.repositories.ConversationRepository;
import org.enspy.snappy.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    public Conversation createConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    public List<Conversation> findUserConversations(UUID userUuid) {
        return conversationRepository.findByUsersContaining(userUuid);
    }
}
