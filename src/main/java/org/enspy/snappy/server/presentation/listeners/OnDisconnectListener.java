package org.enspy.snappy.server.presentation.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.DisconnectListener;
// import java.util.UUID; // No longer needed for UUID.fromString(userId)
import lombok.extern.slf4j.Slf4j;
import org.enspy.snappy.server.infrastructure.helpers.WebSocketHelper;
// import org.enspy.snappy.server.infrastructure.repositories.UserRepository; // No longer directly used for fetching user by UUID for externalId
import org.enspy.snappy.server.infrastructure.storages.ConnectedUserStorage;
import org.springframework.stereotype.Component;
// import reactor.core.publisher.Mono; // No longer needed for this reactive chain

@Slf4j
@Component
public class OnDisconnectListener implements DisconnectListener {

  // private final UserRepository userRepository; // Potentially keep if needed for other user details for broadcast
  private final ConnectedUserStorage connectedUserStorage;

  public OnDisconnectListener(
      /*UserRepository userRepository,*/ ConnectedUserStorage connectedUserStorage) { // UserRepository commented out
    // this.userRepository = userRepository;
    this.connectedUserStorage = connectedUserStorage;
  }

  @Override
  public void onDisconnect(SocketIOClient client) {
    String sessionId = client.getSessionId().toString();
    String userId = client.get("userId"); // Retrieve userId attribute
    String deviceId = client.get("deviceId"); // Retrieve deviceId attribute

    if (userId != null && deviceId != null) {
      log.info("Client disconnected: userId={}, deviceId={}, sessionId={}", userId, deviceId, sessionId);
      boolean removed = connectedUserStorage.removeConnectedUser(userId, deviceId);
      if (removed) {
        log.info("Successfully removed device {} for user {} from storage.", deviceId, userId);

        // Simplified notification: Broadcast that a user's device has disconnected.
        // The event payload might need to be adjusted based on client needs.
        // For now, sending the userId and deviceId.
        // Consider fetching user's externalId if that's what NEW_USER_DISCONNECTION expects.
        // For simplicity, directly using userId and deviceId in a structured payload or just userId.

        // Example: if NEW_USER_DISCONNECTION expects externalId, you might need UserRepository back
        // String userExternalId = client.get("userExternalId"); // If set during onConnect
        // if (userExternalId != null) {
        // client.getNamespace().getBroadcastOperations().sendEvent(
        // WebSocketHelper.OutputEndpoints.NEW_USER_DISCONNECTION, userExternalId);
        // } else {
        // log.warn("userExternalId not found on client for session {}, cannot broadcast disconnection by externalId", sessionId);
        // }

        // More generic device disconnection event
        client.getNamespace().getBroadcastOperations().sendEvent(
            "DEVICE_DISCONNECTED",
            Map.of("userId", userId, "deviceId", deviceId) // Example payload
        );
        log.info("Broadcasted DEVICE_DISCONNECTED event for userId {} deviceId {}", userId, deviceId);

      } else {
        log.warn("Could not remove device {} for user {} from storage. It might have already been removed or was not properly identified.", deviceId, userId);
      }
    } else {
      log.warn("Client disconnected (sessionId={}) but userId or deviceId attribute was not found. User might not have identified device.", sessionId);
      // Fallback or just log, as the primary removal mechanism changed.
      // connectedUserStorage.removeConnectedUserWithSessionId(sessionId); // This method was part of the old logic.
    }
  }
}
