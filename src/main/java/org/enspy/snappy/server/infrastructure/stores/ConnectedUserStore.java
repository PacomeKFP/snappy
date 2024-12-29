package org.enspy.snappy.server.infrastructure.stores;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class ConnectedUserStore {
    // TODO: Abtraire ceci prendre exemple sur [UnreadMessageStore]
    //  - connectedUsers ne doit plus etre un bean
    //  - Toutes les méthodes necessaires à la manipulation du store doivent etre ecrites ici
    //  - Cela facilitera la reutilisatibilité en cas de changement de store (migration vers Redis par exemple)
    /**
     * [UserExternalId]: [sessionId]
     */
    private final HashMap<String, String> connectedUsers = new HashMap<>();

    /**
     * [UserUUID]: [sessionId]
     */
    @Bean
    public HashMap<String, String> initializeConnectedUsers() {
        return connectedUsers;
    }

    public void addConnectedUser(String userId, String sessionId) {
        connectedUsers.put(userId, sessionId);
    }
    public void removeConnectedUser(String userId) {
        connectedUsers.remove(userId);
    }
    public String getConnectedUserSessionId(String userId) {
        return connectedUsers.get(userId);
    }
    public boolean isConnectedUser(String userId) {
        return connectedUsers.containsKey(userId);
    }
    public void clearConnectedUsers() {
        connectedUsers.clear();
    }

}