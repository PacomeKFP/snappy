package org.enspy.snappy.server.presentation.dto.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthenticateOrganizationDto {

  @NotBlank(message = "L'email est obligatoire.")
  @Email(message = "L'email doit être valide.")
  private String email;

  @NotBlank(message = "Le mot de passe est obligatoire.")
  private String password;
}
