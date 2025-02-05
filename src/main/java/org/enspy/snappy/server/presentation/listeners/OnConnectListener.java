package org.enspy.snappy.server.presentation.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.ConnectListener;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.authentication.AuthenticateSocketRequest;
import org.enspy.snappy.server.infrastructure.helpers.WebSocketHelper;
import org.enspy.snappy.server.infrastructure.stores.ConnectedUserStore;
import org.enspy.snappy.server.infrastructure.stores.NotSentMessagesStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public class OnConnectListener implements ConnectListener {

    @Autowired
    private ConnectedUserStore connectedUserStore;

    @Autowired
    private NotSentMessagesStore notSentMessagesStore;

    @Autowired
    private AuthenticateSocketRequest authenticateSocketRequest;

    @Override
    public void onConnect(SocketIOClient client) {
        log.info("new user connected with socket " + client.getSessionId());
        String sessionId = client.getSessionId().toString();
        User user = authenticateSocketRequest.execute(client.getHandshakeData());
        String userExternalId = user.getExternalId();
        String userId = user.getId().toString();
        connectedUserStore.addConnectedUser(userId, sessionId);

        // alerter tous les autres utilisateurs
        client.getNamespace().getAllClients().forEach(namespaceClient -> {
            namespaceClient.sendEvent("new-connection?user=" + userExternalId);
        });

        /*Pour chaque message recu, envoyer le message à l'utilisateur qui s'est connecté*/
        List<Message> notSentUserMessages = notSentMessagesStore.getNotSentMessagesForUser(userId);
        if (!notSentUserMessages.isEmpty()) {
            List<Message> messagesToProcess = new ArrayList<>(notSentUserMessages);
            for (Message message : messagesToProcess) {
                client.sendEvent(WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER, message);
                notSentMessagesStore.removeNotSentMessageForUser(userId, message);
            }
        }
    }
}