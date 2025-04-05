package inc.yowyob.service.snappy.presentation.controllers;

import inc.yowyob.service.snappy.domain.entities.Organization;
import inc.yowyob.service.snappy.domain.entities.User;
import inc.yowyob.service.snappy.domain.usecases.authentication.AuthenticateOrganizationUseCase;
import inc.yowyob.service.snappy.domain.usecases.authentication.AuthenticateUserUseCase;
import inc.yowyob.service.snappy.presentation.dto.authentication.AuthenticateOrganizationDto;
import inc.yowyob.service.snappy.presentation.dto.authentication.AuthenticateUserDto;
import inc.yowyob.service.snappy.presentation.resources.AuthenticationResource;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

  private final AuthenticateOrganizationUseCase authenticateOrganizationUseCase;
  private final AuthenticateUserUseCase authenticateUserUseCase;

  public AuthenticationController(
      AuthenticateOrganizationUseCase authenticateOrganizationUseCase,
      AuthenticateUserUseCase authenticateUserUseCase) {
    this.authenticateOrganizationUseCase = authenticateOrganizationUseCase;
    this.authenticateUserUseCase = authenticateUserUseCase;
  }

  @PostMapping("/organization")
  public ResponseEntity<AuthenticationResource<Organization>> authenticateOrganization(
      @RequestBody @Validated AuthenticateOrganizationDto dto) {
    AuthenticationResource<Organization> authenticationResource =
        authenticateOrganizationUseCase.execute(dto);
    return ResponseEntity.ok(authenticationResource);
  }

  @PostMapping("/user")
  public ResponseEntity<AuthenticationResource<User>> authenticateUser(
      @RequestBody @Validated AuthenticateUserDto dto) {
    AuthenticationResource<User> authenticationResource = authenticateUserUseCase.execute(dto);
    return ResponseEntity.ok(authenticationResource);
  }
}
