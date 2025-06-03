package org.enspy.snappy.server.infrastructure.storages;

import com.corundumstudio.socketio.SocketIOClient; // Added
import lombok.extern.log4j.Log4j2; // Added
import org.springframework.stereotype.Repository;
// import reactor.core.publisher.Mono; // Mono is not used in the active methods

import java.util.ArrayList; // Added
import java.util.Collections; // Added
import java.util.List; // Added
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors; // Added

@Log4j2 // Added
@Repository
public class ConnectedUserStorage {
  //private final ConcurrentHashMap<String, String> connectedUsers = new ConcurrentHashMap<>();

  private final Map<String, Map<String, ConnectedUser>> connectedUsers = new ConcurrentHashMap<>(); // Made final

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

 
public void addConnectedUser(String userId, String deviceId, SocketIOClient session, String ipAddress, int port) { // WebSocketSession changed to SocketIOClient
    log.debug("Attempting to add connected user: userId={}, deviceId={}, ip={}:{}", userId, deviceId, ipAddress, port);
    // Ensure the outer map has an entry for the userId
    connectedUsers.computeIfAbsent(userId, k -> new ConcurrentHashMap<>());
    
    ConnectedUser connectedUser = new ConnectedUser(userId, deviceId, session, ipAddress, port);
    connectedUsers.get(userId).put(deviceId, connectedUser);
    
    log.info("User {} connected with device {} from {}:{}. Session ID: {}", userId, deviceId, ipAddress, port, session.getSessionId());
}


public boolean removeConnectedUser(String userId, String deviceId) {
    log.debug("Attempting to remove connected user: userId={}, deviceId={}", userId, deviceId);
    if (!connectedUsers.containsKey(userId)) {
        log.warn("User {} not found in connected users for removal.", userId);
        return false;
    }
    
    Map<String, ConnectedUser> userDevices = connectedUsers.get(userId);
    ConnectedUser removed = userDevices.remove(deviceId);
    
    if (removed != null) {
        log.info("User {} disconnected device {}. Session ID: {}", userId, deviceId, removed.getSession().getSessionId());
        
        // Si l'utilisateur n'a plus d'appareils connectés, supprimer son entrée
        if (userDevices.isEmpty()) {
            connectedUsers.remove(userId);
            log.info("User {} has no more connected devices. Removed user entry.", userId);
        }
        
        return true;
    } else {
        log.warn("Device {} not found for user {} for removal.", deviceId, userId);
    }
    
    return false;
}


public List<SocketIOClient> getUserSessions(String userId) { // WebSocketSession changed to SocketIOClient
    log.debug("Fetching sessions for userId: {}", userId);
    if (!connectedUsers.containsKey(userId)) {
        log.debug("No sessions found for userId: {}. User not in map.", userId);
        return Collections.emptyList();
    }
    
    List<SocketIOClient> sessions = connectedUsers.get(userId).values().stream()
            .map(ConnectedUser::getSession)
            .collect(Collectors.toList());
    log.debug("Found {} sessions for userId: {}", sessions.size(), userId);
    return sessions;
}


public List<String> getUserDevices(String userId) {
    log.debug("Fetching devices for userId: {}", userId);
    if (!connectedUsers.containsKey(userId)) {
        log.debug("No devices found for userId: {}. User not in map.", userId);
        return Collections.emptyList();
    }
    
    List<String> devices = new ArrayList<>(connectedUsers.get(userId).keySet());
    log.debug("Found {} devices for userId: {}", devices.size(), userId);
    return devices;
}


public boolean isUserConnected(String userId) {
    boolean connected = connectedUsers.containsKey(userId) && !connectedUsers.get(userId).isEmpty();
    log.debug("User {} is {}connected.", userId, connected ? "" : "not ");
    return connected;
}


public int getConnectedDeviceCount(String userId) {
    log.debug("Getting connected device count for userId: {}", userId);
    if (!connectedUsers.containsKey(userId)) {
        log.debug("User {} not in map, device count is 0.", userId);
        return 0;
    }
    int count = connectedUsers.get(userId).size();
    log.debug("User {} has {} connected devices.", userId, count);
    return count;
}


public ConnectedUser getConnectedDevice(String userId, String deviceId) {
    log.debug("Getting connected device: userId={}, deviceId={}", userId, deviceId);
    if (!connectedUsers.containsKey(userId)) {
        log.debug("User {} not in map for getConnectedDevice.", userId);
        return null;
    }
    ConnectedUser device = connectedUsers.get(userId).get(deviceId);
    if (device == null) {
        log.debug("Device {} not found for user {}.", deviceId, userId);
    } else {
        log.debug("Device {} found for user {}.", deviceId, userId);
    }
    return device;
}


}
