package org.enspy.snappy.server.presentation.dto.organization;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateOrganizationDto {

  @NotBlank(message = "Le nom de l'organisation est obligatoire.")
  private String name;

  @Email(message = "Veuillez fournir une adresse email valide.")
  @NotBlank(message = "L'email est obligatoire.")
  private String email;

  @NotBlank(message = "Le mot de passe est obligatoire.")
  private String password;
}
