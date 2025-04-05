package org.enspy.snappy.server.presentation.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.DisconnectListener;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.enspy.snappy.server.infrastructure.helpers.WebSocketHelper;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.storages.ConnectedUserStorage;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Slf4j
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
    log.error("Disconnexion", client);

    // Utilisation réactive pour notifier les autres clients
    connectedUserStorage
        .getConnectedUserId(sessionId)
        .switchIfEmpty(
            Mono.defer(
                () -> {
                  log.warn("Aucun utilisateur associé à la session {}", sessionId);
                  return Mono.empty();
                }))
        .flatMap(
            userId ->
                userRepository
                    .findById(UUID.fromString(userId))
                    .doOnNext(
                        user -> {
                          log.warn("Déconnexion de l'utilisateur {}", userId);
                          client
                              .getNamespace()
                              .getAllClients()
                              .forEach(
                                  namespaceClient ->
                                      namespaceClient.sendEvent(
                                          WebSocketHelper.OutputEndpoints.NEW_USER_DISCONNECTION,
                                          user.getExternalId()));
                        }))
        .subscribe(null, error -> log.error("Erreur lors du traitement de déconnexion", error));
  }
}
