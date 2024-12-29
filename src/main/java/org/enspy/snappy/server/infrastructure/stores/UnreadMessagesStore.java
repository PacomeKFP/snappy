package org.enspy.snappy.server.infrastructure.stores;

import lombok.Getter;
import org.enspy.snappy.server.domain.entities.Message;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;

@Getter
@Component
public class UnreadMessagesStore {
    /**
     * [UserExternalId]: [unreadMessages]
     * */
    private final HashMap<String, ArrayList<Message>> unreadMessages = new HashMap<>();

    public void addUnreadMessageForUser(String userId, Message message) {
        if (unreadMessages.containsKey(userId)) {
            unreadMessages.get(userId).add(message);
        } else {
            unreadMessages.put(userId, new ArrayList<>());
            unreadMessages.get(userId).add(message);
        }
    }
    public void removeUnreadMessageForUser(String userId, Message message) {
        if (unreadMessages.containsKey(userId)) {
            unreadMessages.get(userId).remove(message);
        }
    }
    public void clearUnreadMessagesForUser(String userId) {
        unreadMessages.remove(userId);
    }
    public ArrayList<Message> getUnreadMessagesForUser(String userId) {
        if (unreadMessages.containsKey(userId)) {
            return unreadMessages.get(userId);
        } else {
            return new ArrayList<>();
        }
    }
}
