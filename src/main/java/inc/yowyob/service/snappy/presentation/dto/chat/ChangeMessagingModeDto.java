package inc.yowyob.service.snappy.presentation.dto.chat;

import inc.yowyob.service.snappy.domain.entities.MessagingMode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChangeMessagingModeDto {

  @NotBlank private String requesterId; // The user adding the contact

  @NotBlank private String interlocutorId; // The target contact to be added

  @NotBlank private MessagingMode targetMode; // The target contact to be added

  @NotBlank private String projectId; // The target contact to be added
}
