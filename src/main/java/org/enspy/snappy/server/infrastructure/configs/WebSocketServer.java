package org.enspy.snappy.server.infrastructure.configs;


import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import jakarta.annotation.PreDestroy;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.presentation.listeners.OnConnectListener;
import org.enspy.snappy.server.presentation.listeners.OnDisconnectListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public class WebSocketServer {

    @Autowired
    WebSocketAuthorizationListener webSocketAuthorizationListener;
    @Value("${socket.host}")
    private String SOCKETHOST;
    @Value("${socket.port}")
    private int SOCKETPORT;
    private SocketIOServer server;
    @Autowired
    private OnConnectListener onConnectListener;

    @Autowired
    private OnDisconnectListener onDisconnectListener;

    @Bean
    public SocketIOServer socketIOServer() {
        Configuration config = new Configuration();
        config.setAuthorizationListener(webSocketAuthorizationListener);
        config.setHostname(SOCKETHOST);
        config.setPort(SOCKETPORT);
        config.setAllowCustomRequests(true);
        config.setUpgradeTimeout(10000);
        config.setPingTimeout(60000);
        server = new SocketIOServer(config);
        server.start();
        server.addConnectListener(onConnectListener);
        server.addDisconnectListener(onDisconnectListener);
        // TODO: Rajouter des ecouteurs d'evenements pour les accusé de reception et de lecture de message
        return server;

    }

    @PreDestroy
    public void stopSocketIOServer() {
        this.server.stop();
    }
}
