package org.enspy.snappy.server.presentation.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import lombok.extern.log4j.Log4j2;
import com.corundumstudio.socketio.listener.ConnectListener;

import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.infrastructure.helpers.WebSocketHelper;
import org.enspy.snappy.server.infrastructure.stores.ConnectedUserStore;
import org.enspy.snappy.server.infrastructure.stores.NotSentMessagesStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Log4j2
public class OnConnectListener implements ConnectListener {

    @Autowired
    private ConnectedUserStore connectedUserStore;

    @Autowired
    private NotSentMessagesStore notSentMessagesStore;

    @Override
    public void onConnect(SocketIOClient client) {
        log.info("new user connected with socket " + client.getSessionId());
        String sessionId = client.getSessionId().toString();
        String userId = WebSocketHelper.getUserFromHandShake(client.getHandshakeData());
        connectedUserStore.addConnectedUser(userId, sessionId);

        // alerter tous les autres utilisateurs
        client.getNamespace().getAllClients().stream().forEach(namespaceClient -> {
            namespaceClient.sendEvent("new-connection?user=" + userId);
        });

        /**POur Pour chaque message recu, envoyer le message à l'utilisateur qui s'est connecté*/
        List<Message> notSentUserMessages = notSentMessagesStore.getUnreadMessagesForUser(userId);
        if (!notSentUserMessages.isEmpty()) {
            for (Message message : notSentMessagesStore.getUnreadMessagesForUser(userId)) {
                client.sendEvent(WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER, message);
                notSentMessagesStore.removeUnreadMessageForUser(userId, message);
            }
        }
    }
}