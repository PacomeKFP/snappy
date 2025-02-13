package org.enspy.snappy.server.infrastructure.storages;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class ConnectedUserStorage {
    private final HashMap<String, String> connectedUsers = new HashMap<>();

    public void addConnectedUser(String userId, String sessionId) {
        connectedUsers.put(userId, sessionId);
    }

    public void removeConnectedUserWithId(String userId) {
        connectedUsers.remove(userId);
    }

    public void removeConnectedUserWithSessionId(String sessionId) {
        connectedUsers.entrySet().removeIf(entry -> entry.getValue().equals(sessionId));
    }

    public String getConnectedUserId(String sessionId) {
        return connectedUsers.entrySet().stream()
                .filter(entry -> entry.getValue().equals(sessionId))
                .findFirst()
                .map(Map.Entry::getKey)
                .orElse(null);
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
//TODO : stocker pour chaque conversation l'etat dans lequel il se trouve -> mode de messagerie(ecout..)