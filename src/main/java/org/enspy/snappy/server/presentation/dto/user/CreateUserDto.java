package org.enspy.snappy.server.presentation.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;

import java.util.Map;

@Data
public class CreateUserDto {

    @NotNull(message = "Project ID is required.")
    @NotBlank(message = "Project ID cannot be blank.")
    private String projectId;

    @NotNull(message = "External ID is required.")
    @NotBlank(message = "External ID cannot be blank.")
    private String externalId;

    private String avatar;

    @NotNull(message = "Display name is required.")
    @NotBlank(message = "Display name cannot be blank.")
    private String displayName;

    @Email(message = "Invalid email format.")
    private String email;

    private String phoneNumber;

    @NotNull(message = "Login is required.")
    @NotBlank(message = "Login cannot be blank.")
    private String login;

    @NotNull(message = "Secret is required.")
    @NotBlank(message = "Secret cannot be blank.")
    private String secret;

    private Map<String, String> customJson;
}
