package org.enspy.snappy.server.presentation.controllers;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.authentication.AuthenticateOrganizationUseCase;
import org.enspy.snappy.server.domain.usecases.authentication.AuthenticateUserUseCase;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateOrganizationDto;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateUserDto;
import org.enspy.snappy.server.presentation.resources.AuthenticationResource;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticateOrganizationUseCase authenticateOrganizationUseCase;
    private final AuthenticateUserUseCase authenticateUserUseCase;

    public AuthenticationController(AuthenticateOrganizationUseCase authenticateOrganizationUseCase,
                                    AuthenticateUserUseCase authenticateUserUseCase) {
        this.authenticateOrganizationUseCase = authenticateOrganizationUseCase;
        this.authenticateUserUseCase = authenticateUserUseCase;
    }

    @PostMapping("/organization")
    public ResponseEntity<AuthenticationResource<Organization>> authenticateOrganization(
            @RequestBody @Validated AuthenticateOrganizationDto dto) {
        AuthenticationResource<Organization> authenticationResource = authenticateOrganizationUseCase.execute(dto);
        return ResponseEntity.ok(authenticationResource);
    }

    @PostMapping("/user")
    public ResponseEntity<AuthenticationResource<User>> authenticateUser(
            @RequestBody @Validated AuthenticateUserDto dto) {
        AuthenticationResource<User> authenticationResource = authenticateUserUseCase.execute(dto);
        return ResponseEntity.ok(authenticationResource);
    }
}