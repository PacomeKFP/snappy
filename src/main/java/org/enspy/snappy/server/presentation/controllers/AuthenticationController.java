package org.enspy.snappy.server.presentation.controllers;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.authentication.AuthenticateOrganizationUseCase;
import org.enspy.snappy.server.domain.usecases.authentication.AuthenticateUserUseCase;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateOrganizationDto;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateUserDto;
import org.enspy.snappy.server.presentation.dto.authentication.response.AuthenticateOrganizationResponse;
import org.enspy.snappy.server.presentation.dto.authentication.response.AuthenticateUserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

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
    public Mono<ResponseEntity<AuthenticateOrganizationResponse>> authenticateOrganization(
            @RequestBody @Validated AuthenticateOrganizationDto dto) {
        return authenticateOrganizationUseCase.execute(dto)
                .map(authResource -> ResponseEntity.ok(
                        AuthenticateOrganizationResponse.builder()
                                .id(authResource.getData().getId())
                                .name(authResource.getData().getName())
                                .email(authResource.getData().getEmail())
                                .projectId(authResource.getData().getProjectId())
                                .privateKey(authResource.getData().getPrivateKey())
                                .createdAt(authResource.getData().getCreatedAt())
                                .updatedAt(authResource.getData().getUpdatedAt())
                                .token(authResource.getToken())
                                .build()
                ));
    }

    @PostMapping("/user")
    public Mono<ResponseEntity<AuthenticateUserResponse>> authenticateUser(
            @RequestBody @Validated AuthenticateUserDto dto) {
        return authenticateUserUseCase.execute(dto)
                .map(authResource -> ResponseEntity.ok(
                        AuthenticateUserResponse.builder()
                                .id(authResource.getData().getId())
                                .projectId(authResource.getData().getProjectId())
                                .externalId(authResource.getData().getExternalId())
                                .avatar(authResource.getData().getAvatar())
                                .displayName(authResource.getData().getDisplayName())
                                .email(authResource.getData().getEmail())
                                .phoneNumber(authResource.getData().getPhoneNumber())
                                .login(authResource.getData().getLogin())
                                .isOnline(authResource.getData().isOnline())
                                .organizationId(authResource.getData().getOrganizationId())
                                .createdAt(authResource.getData().getCreatedAt())
                                .updatedAt(authResource.getData().getUpdatedAt())
                                .token(authResource.getToken())
                                .build()
                ));
    }
}