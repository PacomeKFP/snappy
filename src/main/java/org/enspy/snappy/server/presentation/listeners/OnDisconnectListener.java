package org.enspy.snappy.server.presentation.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.DisconnectListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class OnDisconnectListener implements DisconnectListener {

    @Autowired
    private HashMap<String, String> connectedUsers;

    @Override
    public void onDisconnect(SocketIOClient client) {
        String sessionId = client.getSessionId().toString();
        for (String user : connectedUsers.keySet()) {
            if (connectedUsers.get(user).equals(sessionId)) {
                connectedUsers.remove(user);
                // signaler à tous les clients qu'il s'est deconnecté
                client.getNamespace().getAllClients().stream().forEach(namespaceClient -> {
                    namespaceClient.sendEvent("new-disconnection?user=" + user);
                });
                return;
            }
        }
    }
}
