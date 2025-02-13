package org.enspy.snappy.server.presentation.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.DisconnectListener;
import java.util.Optional;
import java.util.UUID;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.stores.ConnectedUserStore;
import org.springframework.stereotype.Component;

@Component
public class OnDisconnectListener implements DisconnectListener {

    private final UserRepository userRepository;
    private final ConnectedUserStore connectedUserStore;

    public OnDisconnectListener(UserRepository userRepository, ConnectedUserStore connectedUserStore) {
        this.userRepository = userRepository;
        this.connectedUserStore = connectedUserStore;
    }


    @Override
    public void onDisconnect(SocketIOClient client) {
        String sessionId = client.getSessionId().toString();
        connectedUserStore.removeConnectedUserWithSessionId(sessionId);


        // TODO: modifier ceci pour signaler uniquement à ses contacts
        String userId = connectedUserStore.getConnectedUserId(sessionId);
        if (userId == null)
            return;
        Optional<User> user = userRepository.findById(UUID.fromString(userId));
        client.getNamespace().getAllClients().stream().forEach(namespaceClient -> {
            user.ifPresent(value -> namespaceClient.sendEvent("new-disconnection?user=" + value.getExternalId()));
        });

    }
}
