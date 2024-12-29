package org.enspy.snappy.server.presentation.controllers;

import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateOrganizationDto;
import org.enspy.snappy.server.domain.usecases.authentication.AuthenticateOrganizationUseCase;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticateOrganizationUseCase authenticateOrganizationUseCase;

    public AuthenticationController(AuthenticateOrganizationUseCase authenticateOrganizationUseCase) {
        this.authenticateOrganizationUseCase = authenticateOrganizationUseCase;
    }

    @PostMapping("/organization")
    public ResponseEntity<String> authenticateOrganization(
            @RequestBody @Validated AuthenticateOrganizationDto dto) {
        try {
            String token = authenticateOrganizationUseCase.execute(dto);
            return ResponseEntity.ok(token);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }
}