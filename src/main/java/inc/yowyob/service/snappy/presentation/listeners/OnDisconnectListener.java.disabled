package inc.yowyob.service.snappy.presentation.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.DisconnectListener;
import inc.yowyob.service.snappy.domain.entities.User;
import inc.yowyob.service.snappy.infrastructure.repositories.UserRepository;
import inc.yowyob.service.snappy.infrastructure.storages.ConnectedUserStorage;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class OnDisconnectListener implements DisconnectListener {

  private final UserRepository userRepository;
  private final ConnectedUserStorage connectedUserStorage;

  public OnDisconnectListener(
      UserRepository userRepository, ConnectedUserStorage connectedUserStorage) {
    this.userRepository = userRepository;
    this.connectedUserStorage = connectedUserStorage;
  }

  @Override
  public void onDisconnect(SocketIOClient client) {
    String sessionId = client.getSessionId().toString();
    connectedUserStorage.removeConnectedUserWithSessionId(sessionId);

    // TODO: modifier ceci pour signaler uniquement à ses contacts
    String userId = connectedUserStorage.getConnectedUserId(sessionId);
    if (userId == null) return;
    Optional<User> user = userRepository.findById(UUID.fromString(userId));
    client.getNamespace().getAllClients().stream()
        .forEach(
            namespaceClient -> {
              user.ifPresent(
                  value ->
                      namespaceClient.sendEvent("new-disconnection?user=" + value.getExternalId()));
            });
  }
}
