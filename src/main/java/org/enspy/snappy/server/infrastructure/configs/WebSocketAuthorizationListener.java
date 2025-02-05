package org.enspy.snappy.server.infrastructure.configs;

import com.corundumstudio.socketio.AuthorizationListener;
import com.corundumstudio.socketio.AuthorizationResult;
import com.corundumstudio.socketio.HandshakeData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class WebSocketAuthorizationListener implements AuthorizationListener {

  @Override
  public AuthorizationResult getAuthorizationResult(HandshakeData handshakeData) {
    Object token = handshakeData.getAuthToken();
    log.info("Authorization token: " + handshakeData.getHttpHeaders().toString());
    return AuthorizationResult.SUCCESSFUL_AUTHORIZATION;
  }
}
