package inc.yowyob.service.snappy.presentation.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GetUserContactsDto {

  @NotBlank private String userExternalId; // The target user

  @NotBlank private String projectId; // The reference project for the user
}
