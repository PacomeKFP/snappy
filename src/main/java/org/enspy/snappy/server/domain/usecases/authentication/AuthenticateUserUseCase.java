package org.enspy.snappy.server.domain.usecases.authentication;

import java.util.Map;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.exceptions.AuthenticationFailedException;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.services.JwtService;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateUserDto;
import org.enspy.snappy.server.presentation.resources.AuthenticationResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticateUserUseCase
    implements UseCase<AuthenticateUserDto, AuthenticationResource<User>> {

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
  public AuthenticationResource<User> execute(AuthenticateUserDto authenticateUserDto) {
    User user =
        userRepository
            .findByLoginAndProjectId(
                authenticateUserDto.getLogin(), authenticateUserDto.getProjectId())
            .orElseThrow(
                () ->
                    new AuthenticationFailedException(
                        "Invalid credential provided; no user with login {"
                            + authenticateUserDto.getLogin()
                            + "} found for the specified project"));

    if (!passwordEncoder.matches(authenticateUserDto.getSecret(), user.getSecret()))
      throw new AuthenticationFailedException("Mot de passe incorrect !");
    Map<String, Object> claims =
        Map.of(
            "userId",
            user.getId(),
            "externalId",
            user.getExternalId(),
            "projectId",
            user.getProjectId());

    return new AuthenticationResource<User>(user, jwtService.generateToken(claims, user));
  }
}
