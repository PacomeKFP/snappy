package org.enspy.snappy.server.presentation.dto.chat.response;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangeMessagingModeResponse {
    private UUID id;
    private String projectId;
    private String sender;
    private String receiver;
    private String mode; // Representing MessagingMode enum
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
