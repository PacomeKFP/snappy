package org.enspy.snappy.server.presentation.dto.authentication;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthenticateUserDto {
    @NotBlank
    private String projectId;
    @NotBlank
    private String login;
    @NotBlank
    private String secret;
}
