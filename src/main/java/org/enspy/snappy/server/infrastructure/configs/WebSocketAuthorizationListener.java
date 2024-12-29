package org.enspy.snappy.server.infrastructure.configs;

import com.corundumstudio.socketio.AuthorizationListener;
import com.corundumstudio.socketio.AuthorizationResult;
import com.corundumstudio.socketio.HandshakeData;
import org.springframework.stereotype.Component;

@Component
public class WebSocketAuthorizationListener implements AuthorizationListener {

    @Override
    public AuthorizationResult getAuthorizationResult(HandshakeData handshakeData) {
        handshakeData.getAuthToken();

        return AuthorizationResult.SUCCESSFUL_AUTHORIZATION;
    }
}
