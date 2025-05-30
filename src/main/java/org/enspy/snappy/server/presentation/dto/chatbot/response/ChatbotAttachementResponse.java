package org.enspy.snappy.server.presentation.dto.chatbot.response;

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
public class ChatbotAttachementResponse {
    private UUID id;
    private Long filesize;
    private String mimetype;
    private String filename;
    private String path;
    private UUID chatbotId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
