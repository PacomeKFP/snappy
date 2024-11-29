package org.enspy.snappy.config;


import com.corundumstudio.socketio.AuthorizationListener;
import jakarta.annotation.PreDestroy;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.helpers.WebSocketHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
@Log4j2
public class WebSocketServer {

    @Value("${socket.host}")
    private String SOCKETHOST;

    @Value("${socket.port}")
    private int SOCKETPORT;

    private SocketIOServer server;

    /**
     * [UserUUID]: [sessionId]
     */
    //TODO: deplacer cette variable et l'initialiserdans le store
    private HashMap<String, String> connectedUsers;

    @Autowired
    WebSocketAuthorizationListener webSocketAuthorizationListener;

    @Bean
    public Map<String, String> initializeConnectedUsers() {
        connectedUsers = new HashMap<>();
        return connectedUsers;
    }

    @Bean
    public SocketIOServer socketIOServer() {
        Configuration config = new Configuration();
        config.setAuthorizationListener(webSocketAuthorizationListener);
        config.setHostname(SOCKETHOST);
        config.setPort(SOCKETPORT);
        server = new SocketIOServer(config);
        server.start();
        server.addConnectListener(new ConnectListener() {
            @Override
            public void onConnect(SocketIOClient client) {
                log.info("new user connected with socket " + client.getSessionId());
                String sessionId = client.getSessionId().toString();
                String userUuid = WebSocketHelper.getUserFromHandShake(client.getHandshakeData());
                connectedUsers.put(userUuid, sessionId);

                // alerter tous les autres utilisateurs
                client.getNamespace().getAllClients().stream().forEach(namespaceClient -> {
                    namespaceClient.sendEvent("new-connection?user=" + userUuid);
                });

            }

        });

        server.addDisconnectListener(new DisconnectListener() {
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
        });
        return server;
    }

    @PreDestroy
    public void stopSocketIOServer() {
        this.server.stop();
    }
}
