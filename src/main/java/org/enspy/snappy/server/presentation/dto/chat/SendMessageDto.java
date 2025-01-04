package org.enspy.snappy.server.presentation.dto.chat;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class SendMessageDto {
    @NotNull
    private String senderId;        

    @NotNull
    private String receiverId;      
    @NotBlank
    private String body;             

    @NotBlank
    private String projectId;
}