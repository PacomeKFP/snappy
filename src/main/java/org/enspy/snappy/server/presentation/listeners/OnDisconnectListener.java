package org.enspy.snappy.server.presentation.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.DisconnectListener;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.stores.ConnectedUserStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.swing.text.html.Option;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;

@Component
public class OnDisconnectListener implements DisconnectListener {

    private static final Logger log = LoggerFactory.getLogger(OnDisconnectListener.class);
    @Autowired
    private ConnectedUserStore connectedUserStore;

    @Autowired
    private UserRepository userRepository;


    @Override
    public void onDisconnect(SocketIOClient client) {
        String sessionId = client.getSessionId().toString();
        String userId = connectedUserStore.getConnectedUserId(sessionId);
        Optional<User> user = userRepository.findById(UUID.fromString(userId));

        connectedUserStore.removeConnectedUserWithSessionId(sessionId);

        // TODO: modifier ceci pour signaler uniquement à ses contacts
        client.getNamespace().getAllClients().stream().forEach(namespaceClient -> {
            user.ifPresent(value -> namespaceClient.sendEvent("new-disconnection?user=" + value.getExternalId()));
        });
        log.info(connectedUserStore.getConnectedUsers().toString());

    }
}
