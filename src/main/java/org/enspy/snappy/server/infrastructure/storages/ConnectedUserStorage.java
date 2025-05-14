package org.enspy.snappy.server.infrastructure.storages;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public class ConnectedUserStorage {
  //private final ConcurrentHashMap<String, String> connectedUsers = new ConcurrentHashMap<>();

  private Map<String, Map<String, ConnectedUser>> connectedUsers = new ConcurrentHashMap<>();

  /*public Mono<Void> addConnectedUser(String userId, String sessionId) {
    return Mono.fromRunnable(() -> connectedUsers.put(userId, sessionId));
  }

  public Mono<Void> removeConnectedUserWithId(String userId) {
    return Mono.fromRunnable(() -> connectedUsers.remove(userId));
  }

  public Mono<Void> removeConnectedUserWithSessionId(String sessionId) {
    return Mono.fromRunnable(
        () -> connectedUsers.entrySet().removeIf(entry -> entry.getValue().equals(sessionId)));
  }

  public Mono<String> getConnectedUserId(String sessionId) {
    return Mono.fromCallable(
        () ->
            connectedUsers.entrySet().stream()
                .filter(entry -> entry.getValue().equals(sessionId))
                .findFirst()
                .map(Map.Entry::getKey)
                .orElse(null));
  }

  public Mono<String> getConnectedUserSessionId(String userId) {
    return Mono.justOrEmpty(connectedUsers.get(userId));
  }

  public Mono<Boolean> isConnectedUser(String userId) {
    return Mono.fromCallable(() -> connectedUsers.containsKey(userId));
  }

  public Mono<Void> clearConnectedUsers() {
    return Mono.fromRunnable(connectedUsers::clear);
  }*/

  // Nouvelle version en tenant compte du broadcasting

 
public void addConnectedUser(String userId, String deviceId, WebSocketSession session, String ipAddress, int port) {
    if (!connectedUsers.containsKey(userId)) {
        connectedUsers.put(userId, new ConcurrentHashMap<>());
    }
    
    ConnectedUser connectedUser = new ConnectedUser(userId, deviceId, session, ipAddress, port);
    connectedUsers.get(userId).put(deviceId, connectedUser);
    
    log.info("User {} connected with device {} from {}:{}", userId, deviceId, ipAddress, port);
}


public boolean removeConnectedUser(String userId, String deviceId) {
    if (!connectedUsers.containsKey(userId)) {
        return false;
    }
    
    Map<String, ConnectedUser> userDevices = connectedUsers.get(userId);
    ConnectedUser removed = userDevices.remove(deviceId);
    
    if (removed != null) {
        log.info("User {} disconnected device {}", userId, deviceId);
        
        // Si l'utilisateur n'a plus d'appareils connectés, supprimer son entrée
        if (userDevices.isEmpty()) {
            connectedUsers.remove(userId);
            log.info("User {} has no more connected devices", userId);
        }
        
        return true;
    }
    
    return false;
}


public List<WebSocketSession> getUserSessions(String userId) {
    if (!connectedUsers.containsKey(userId)) {
        return Collections.emptyList();
    }
    
    return connectedUsers.get(userId).values().stream()
            .map(ConnectedUser::getSession)
            .collect(Collectors.toList());
}


public List<String> getUserDevices(String userId) {
    if (!connectedUsers.containsKey(userId)) {
        return Collections.emptyList();
    }
    
    return new ArrayList<>(connectedUsers.get(userId).keySet());
}


public boolean isUserConnected(String userId) {
    return connectedUsers.containsKey(userId) && !connectedUsers.get(userId).isEmpty();
}


public int getConnectedDeviceCount(String userId) {
    if (!connectedUsers.containsKey(userId)) {
        return 0;
    }
    return connectedUsers.get(userId).size();
}


public ConnectedUser getConnectedDevice(String userId, String deviceId) {
    if (!connectedUsers.containsKey(userId)) {
        return null;
    }
    
    return connectedUsers.get(userId).get(deviceId);
}


}
