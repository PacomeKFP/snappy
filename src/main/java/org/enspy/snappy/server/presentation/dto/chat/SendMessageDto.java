package org.enspy.snappy.server.presentation.dto.chat;

import jakarta.annotation.Nullable;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class SendMessageDto {
    @NotNull
    private String senderId;        

    @NotNull
    private String receiverId;      
    @NotBlank
    private String body;

    @Nullable
    private List<MultipartFile> attachements;

    @NotBlank
    private String projectId;
}