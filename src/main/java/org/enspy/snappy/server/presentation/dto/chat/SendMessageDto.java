package org.enspy.snappy.server.presentation.dto.chat;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Data;
import org.springframework.http.codec.multipart.FilePart;

@Data
public class SendMessageDto {
    @NotNull
    private String senderId;        

    // @NotNull // Removed to allow receiverId to be null if receiverIds is used
    private String receiverId;      

    private List<String> receiverIds; // Added new field

    @NotBlank
    private String body;

    @Nullable
    private List<FilePart> attachements;

    @NotBlank
    private String projectId;
}