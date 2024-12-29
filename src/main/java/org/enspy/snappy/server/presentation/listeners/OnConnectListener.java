package org.enspy.snappy.server.presentation.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import lombok.extern.log4j.Log4j2;
import com.corundumstudio.socketio.listener.ConnectListener;

import org.enspy.snappy.server.infrastructure.helpers.WebSocketHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
@Log4j2
public class OnConnectListener implements ConnectListener {

    @Autowired
    private HashMap<String, String> connectedUsers;

    @Override
    public void onConnect(SocketIOClient client) {
        log.info("new user connected with socket " + client.getSessionId());
        String sessionId = client.getSessionId().toString();
        String userId = WebSocketHelper.getUserFromHandShake(client.getHandshakeData());
        connectedUsers.put(userId, sessionId);

        // alerter tous les autres utilisateurs
        client.getNamespace().getAllClients().stream().forEach(namespaceClient -> {
            namespaceClient.sendEvent("new-connection?user=" + userId);
        });

        // TODO: Envoyer à l'utilisateur tous les messages qu'il n'a pas lu
        //  ceci peut etre fait par injection du UseCase d'envoie de message, il a des méthodes pour envoyer les messages à un utilisateur
        /**POur Pour chaque message recu, envoyer le message à l'utilisateur qui s'est connecté
         * */
    }
}