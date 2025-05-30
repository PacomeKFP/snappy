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
public class MessageAttachementResponse {
    private UUID id;
    private String mimetype;
    private String filename;
    private String path;
    private Long filesize;
    private UUID messageId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
