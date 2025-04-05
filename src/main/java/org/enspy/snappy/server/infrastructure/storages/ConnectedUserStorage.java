package org.enspy.snappy.server.infrastructure.storages;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public class ConnectedUserStorage {
  private final ConcurrentHashMap<String, String> connectedUsers = new ConcurrentHashMap<>();

  public Mono<Void> addConnectedUser(String userId, String sessionId) {
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
  }
}
