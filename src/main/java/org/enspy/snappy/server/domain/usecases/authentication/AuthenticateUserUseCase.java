package org.enspy.snappy.server.domain.usecases.authentication;

import java.util.Map;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.exceptions.AuthenticationFailedException;
import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.services.JwtService;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateUserDto;
import org.enspy.snappy.server.presentation.resources.AuthenticationResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class AuthenticateUserUseCase
    implements MonoUseCase<AuthenticateUserDto, AuthenticationResource<User>> {

  private final JwtService jwtService;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthenticateUserUseCase(
      JwtService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.jwtService = jwtService;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public Mono<AuthenticationResource<User>> execute(AuthenticateUserDto authenticateUserDto) {
    return userRepository
        .findByLoginAndProjectId(authenticateUserDto.getLogin(), authenticateUserDto.getProjectId())
        .switchIfEmpty(
            Mono.error(
                new AuthenticationFailedException(
                    "Invalid credential provided; no user with login {"
                        + authenticateUserDto.getLogin()
                        + "} found for the specified project")))
        .flatMap(
            user -> {
              if (!passwordEncoder.matches(authenticateUserDto.getSecret(), user.getSecret())) {
                return Mono.error(new AuthenticationFailedException("Mot de passe incorrect !"));
              }

              Map<String, Object> claims =
                  Map.of(
                      "userId", user.getId(),
                      "externalId", user.getExternalId(),
                      "projectId", user.getProjectId());

              return jwtService
                  .generateTokenReactive(claims, user)
                  .map(token -> new AuthenticationResource<>(user, token));
            });
  }
}
