package org.enspy.snappy.server.infrastructure.stores;

import java.util.ArrayList;
import java.util.HashMap;
import lombok.Getter;
import org.enspy.snappy.server.domain.entities.Message;
import org.springframework.stereotype.Component;

@Getter
@Component
public class NotSentMessagesStore {
    /**
     * [UserExternalId]: [notSentMessages]
     * */
    private final HashMap<String, ArrayList<Message>> notSentMessages = new HashMap<>();

    public void addNotSentMessageForUser(String userId, Message message) {
        if (notSentMessages.containsKey(userId)) {
            notSentMessages.get(userId).add(message);
        } else {
            notSentMessages.put(userId, new ArrayList<>());
            notSentMessages.get(userId).add(message);
        }
    }
    public void removeNotSentMessageForUser(String userId, Message message) {
        if (notSentMessages.containsKey(userId)) {
            notSentMessages.get(userId).remove(message);
        }
    }
    public void clearNotSentMessagesForUser(String userId) {
        notSentMessages.remove(userId);
    }
    public ArrayList<Message> getNotSentMessagesForUser(String userId) {
        if (notSentMessages.containsKey(userId)) {
            return notSentMessages.get(userId);
        } else {
            return new ArrayList<>();
        }
    }
}
