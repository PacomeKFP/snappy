package org.enspy.snappy.server.presentation.dto.chat;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.enspy.snappy.server.domain.entities.MessagingMode;

@Data
public class ChangeMessagingModeDto {

  @NotBlank private String requesterId; // The user adding the contact

  @NotBlank private String interlocutorId; // The target contact to be added

  @NotBlank private MessagingMode targetMode; // The target contact to be added

  @NotBlank private String projectId; // The target contact to be added
}
