package org.enspy.snappy.server.presentation.dto.chat.response;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
    private UUID id;
    private String projectId;
    private String body;
    private boolean isWrittenByHuman;
    private String ack; // Representing MessageAck enum
    private String senderExternalId; // From Message.getSenderProjection()
    private String receiverExternalId; // From Message.getReceiverProjection()
    private UUID senderId; // actual FK
    private UUID receiverId; // actual FK
    private List<MessageAttachementResponse> messageAttachements;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
