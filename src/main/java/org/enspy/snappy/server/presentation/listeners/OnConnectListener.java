package org.enspy.snappy.server.presentation.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.ConnectListener;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.authentication.AuthenticateSocketRequest;
import org.enspy.snappy.server.infrastructure.helpers.WebSocketHelper;
import org.enspy.snappy.server.infrastructure.storages.ConnectedUserStorage;
import org.enspy.snappy.server.infrastructure.storages.NotSentMessagesStorage;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public class OnConnectListener implements ConnectListener {

  private final ConnectedUserStorage connectedUserStorage;
  private final NotSentMessagesStorage notSentMessagesStorage;
  private final AuthenticateSocketRequest authenticateSocketRequest;

  public OnConnectListener(
      ConnectedUserStorage connectedUserStorage,
      NotSentMessagesStorage notSentMessagesStorage,
      AuthenticateSocketRequest authenticateSocketRequest) {
    this.connectedUserStorage = connectedUserStorage;
    this.notSentMessagesStorage = notSentMessagesStorage;
    this.authenticateSocketRequest = authenticateSocketRequest;
  }

  @Override
  public void onConnect(SocketIOClient client) {
    log.info("new user connected with socket " + client.getSessionId());
    String sessionId = client.getSessionId().toString();
    User user = authenticateSocketRequest.execute(client.getHandshakeData()).block();
    assert user != null;
    String userExternalId = user.getExternalId();
    String userId = user.getId().toString();
    connectedUserStorage.addConnectedUser(userId, sessionId);

    // alerter tous les autres utilisateurs
    client
        .getNamespace()
        .getAllClients()
        .forEach(
            namespaceClient -> {
              namespaceClient.sendEvent(
                  WebSocketHelper.OutputEndpoints.NEW_USER_CONNECTION, userExternalId);
            });

    /*Pour chaque message recu, envoyer le message à l'utilisateur qui s'est connecté*/
    //        List<Message> notSentUserMessages =
    // notSentMessagesStorage.getNotSentMessagesForUser(userId);
    //        if (!notSentUserMessages.isEmpty()) {
    //            List<Message> messagesToProcess = new ArrayList<>(notSentUserMessages);
    //            for (Message message : messagesToProcess) {
    //                client.sendEvent(WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER,
    // message);
    //                notSentMessagesStorage.removeNotSentMessageForUser(userId, message);
    //            }
    //        }
  }
}
