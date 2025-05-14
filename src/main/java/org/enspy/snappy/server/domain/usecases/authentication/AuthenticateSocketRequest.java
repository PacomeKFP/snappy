package org.enspy.snappy.server.domain.usecases.authentication;

import com.corundumstudio.socketio.HandshakeData;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.exceptions.AuthenticationFailedException;
import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.services.JwtService;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class AuthenticateSocketRequest implements MonoUseCase<HandshakeData, User> {

  private final JwtService jwtService;
  private final UserRepository userRepository;

  //Nouveau
  private String token;
  private String deviceId;
  private List<String> prekeyBundle;

  public AuthenticateSocketRequest(JwtService jwtService, UserRepository userRepository) {
    this.jwtService = jwtService;
    this.userRepository = userRepository;
  }

  @Override
  public Mono<User> execute(HandshakeData handshakeData) {
    String userExternalId = handshakeData.getSingleUrlParam("user");
    String projectId = handshakeData.getSingleUrlParam("projectId");

    // Extraire les claims du token jwt (à implémenter via jwtService si nécessaire)

    return userRepository
        .findByExternalIdAndProjectId(userExternalId, projectId)
        .switchIfEmpty(Mono.error(new AuthenticationFailedException("The user not found")));
  }
}
