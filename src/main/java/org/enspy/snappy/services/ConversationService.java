package org.enspy.snappy.services;

import org.enspy.snappy.controllers.dto.CreateConversationDto;
import org.enspy.snappy.models.Conversation;
import org.enspy.snappy.repositories.ConversationRepository;
import org.enspy.snappy.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    public Conversation createConversation(CreateConversationDto conversationDto) {
        Map<UUID, Integer> states = new HashMap<UUID, Integer>();
        List<UUID> uuids = conversationDto.getUsers().stream().map(user -> {
            UUID userUid = UUID.fromString(user);
            states.put(userUid, -1);
            return userUid;
        }).toList();

        UUID uid = UUID.randomUUID();
        LocalDateTime now = LocalDateTime.now();
        Conversation conversation = new Conversation(uid, uuids, states, now, now);

        return conversationRepository.save(conversation);
    }

    public Integer switchSnappyStatus(UUID conversationUuid, UUID userUuid) {
        Conversation conversation = conversationRepository.findById(conversationUuid).orElse(null);
        if (conversation == null) {
            return null;
        }
        Integer state = conversation.getStates().getOrDefault(userUuid, -1);
        if (state == 1){
            state = -1;
        }else {
            state++;
        }
        conversation.getStates().put(userUuid, state);
        conversationRepository.changeState(conversationUuid, userUuid, state);
//                .save(conversation);

        return state;

    }
    public List<Conversation> normalize(){
        List<Conversation> conversations = conversationRepository.findAll();
        conversations.forEach(
                conversation -> {
                    if (conversation.getStates() == null){
                        conversation.setStates(new HashMap<UUID, Integer>());
                        conversationRepository.save(conversation);
                    }
                }
        );
        return conversations;
    }

    public List<Conversation> findUserConversations(UUID userUuid) {
        return conversationRepository.findByUsersContaining(userUuid);
    }
}
