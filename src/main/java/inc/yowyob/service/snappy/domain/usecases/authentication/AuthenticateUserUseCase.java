package inc.yowyob.service.snappy.domain.usecases.authentication;

import inc.yowyob.service.snappy.domain.entities.User;
import inc.yowyob.service.snappy.domain.exceptions.AuthenticationFailedException;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.UserRepository;
import inc.yowyob.service.snappy.infrastructure.services.JwtService;
import inc.yowyob.service.snappy.presentation.dto.authentication.AuthenticateUserDto;
import inc.yowyob.service.snappy.presentation.resources.AuthenticationResource;
import java.util.Map;
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
