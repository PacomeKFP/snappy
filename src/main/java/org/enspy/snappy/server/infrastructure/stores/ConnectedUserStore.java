package org.enspy.snappy.server.infrastructure.stores;

import lombok.Getter;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Getter
@Component
public class ConnectedUserStore {
    private final HashMap<String, String> connectedUsers = new HashMap<>();

    public void addConnectedUser(String userId, String sessionId) {
        connectedUsers.put(userId, sessionId);
    }

    public void removeConnectedUserWithId(String userId) {
        connectedUsers.remove(userId);
    }

    public void removeConnectedUserWithSessionId(String sessionId) {
        connectedUsers.entrySet().stream()
                .filter(entry -> entry.getValue().equals(sessionId))
                .forEach(entry -> connectedUsers.remove(entry.getKey()));
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