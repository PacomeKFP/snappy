package org.enspy.snappy.server.infrastructure.storages;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public class ConnectedUserStorage {
  private final ConcurrentHashMap<String, String> userIdToSessionIdMap = new ConcurrentHashMap<>();
  private final ConcurrentHashMap<String, String> sessionIdToUserIdMap = new ConcurrentHashMap<>();

  public Mono<Void> addConnectedUser(String userId, String sessionId) {
    return Mono.fromRunnable(
        () -> {
          // If the user is already connected with a different session, remove the old session mapping
          String oldSessionId = userIdToSessionIdMap.put(userId, sessionId);
          if (oldSessionId != null && !oldSessionId.equals(sessionId)) {
            sessionIdToUserIdMap.remove(oldSessionId);
          }
          sessionIdToUserIdMap.put(sessionId, userId);
        });
  }

  public Mono<Void> removeConnectedUserWithId(String userId) {
    return Mono.fromRunnable(
        () -> {
          String sessionId = userIdToSessionIdMap.remove(userId);
          if (sessionId != null) {
            sessionIdToUserIdMap.remove(sessionId);
          }
        });
  }

  public Mono<Void> removeConnectedUserWithSessionId(String sessionId) {
    return Mono.fromRunnable(
        () -> {
          String userId = sessionIdToUserIdMap.remove(sessionId);
          if (userId != null) {
            userIdToSessionIdMap.remove(userId);
          }
        });
  }

  public Mono<String> getConnectedUserId(String sessionId) {
    return Mono.justOrEmpty(sessionIdToUserIdMap.get(sessionId));
  }

  public Mono<String> getConnectedUserSessionId(String userId) {
    return Mono.justOrEmpty(userIdToSessionIdMap.get(userId));
  }

  public Mono<Boolean> isConnectedUser(String userId) {
    return Mono.fromCallable(() -> userIdToSessionIdMap.containsKey(userId));
  }

  public Mono<Void> clearConnectedUsers() {
    return Mono.fromRunnable(
        () -> {
          userIdToSessionIdMap.clear();
          sessionIdToUserIdMap.clear();
        });
  }
}
