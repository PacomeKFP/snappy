package org.enspy.snappy.server.presentation.dto.chatbot;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.enspy.snappy.server.domain.entities.Chatbot;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveChatbotAttachementDto {
    private Chatbot chatbot;
    private List<MultipartFile> attachements;
}
