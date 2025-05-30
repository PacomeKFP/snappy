package org.enspy.snappy.server.presentation.dto.chatbot.response;

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
public class ChatbotResponse {
    private UUID id;
    private String label;
    private String prompt;
    private String description;
    private String projectId;
    private String languageModel; // Representing ChatbotLLM enum
    private String accessKey;
    private UUID organizationId;
    private List<ChatbotAttachementResponse> chatbotAttachements;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
