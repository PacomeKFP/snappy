package org.enspy.snappy.stores;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.enspy.snappy.helpers.ConversationStatus;
import org.enspy.snappy.models.Conversation;
import org.enspy.snappy.repositories.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class ConversationStatusStore {
    public HashMap<String, HashMap<String, ConversationStatus>> conversationStatusStorage;

    @Autowired
    ConversationRepository conversationRepository;


    @Bean
    public HashMap<String, HashMap<String, ConversationStatus>> initializeConversationStatusStorage() {
        conversationStatusStorage = new HashMap<String, HashMap<String, ConversationStatus>>();
        
        //                     get allconversations
        List<Conversation> conversations = conversationRepository.findAll();

        
        for (Conversation conversation : conversations) {
            HashMap<String, ConversationStatus> conversationStatus = new HashMap<String, ConversationStatus>();
            for (Map.Entry<UUID, Integer> entry : conversation.getStates().entrySet()) {
                String userUuid = entry.getKey().toString();
                Integer state = entry.getValue();
                ConversationStatus conversationStatusValue = ConversationStatus.values()[state];
                conversationStatus.put(userUuid, conversationStatusValue);
            }
            conversationStatusStorage.put(conversation.getUuid().toString(), conversationStatus);
        }

        System.out.println("conversationStatusStorage : " + conversationStatusStorage);

        return conversationStatusStorage;
    }

    // private HashMap<String, String> connectedUsers;

   
    
    
    /*public List<Conversation> getAllUserConversations(UUID userUid) {
        ConversationService conversationService = null;
                return conversationService.findUserConversations(userUid);
    }

    public HashMap< HashMap< String, userUid>, HashMap<String, conversationStatus>> conversationStatus;

    @Bean
    public HashMap< HashMap< String, userUid>, HashMap<String, conversationStatus>> initializeConversationStatus() {
        conversationStatus = new HashMap<>();
        return conversationStatus;
    }*/


}

/*Etapes pour le travail en cours
 * 
 * - reccuperer toutes les conversations en bd
 * - pour chaque conversation
 *  - reccuperer le uuid de lq conversation et en faire un cle
 *  - reccuperer le contenu de states et en faire la valeur
 * 
 * une fois cela fait on obtien une nouvelle map conversationStatus
 */