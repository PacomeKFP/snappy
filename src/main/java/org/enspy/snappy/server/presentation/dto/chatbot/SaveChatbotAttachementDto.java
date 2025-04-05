package org.enspy.snappy.server.presentation.dto.chatbot;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.enspy.snappy.server.domain.entities.Chatbot;
import org.springframework.http.codec.multipart.FilePart;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveChatbotAttachementDto {
    private Chatbot chatbot;
    private List<FilePart> attachements;
}
