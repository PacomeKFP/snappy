package org.enspy.snappy.server.presentation.dto.chat;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class SendMessageDto {
    @NotNull
    private String senderId;        // UUID of the sender

    @NotNull
    private String receiverId;      // UUID of the receiver

    @NotBlank
    private String body;            // The actual message content

    @NotBlank
    private String projectId;
}