package inc.yowyob.service.snappy.presentation.dto.chatbot;

import inc.yowyob.service.snappy.domain.entities.Chatbot;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveChatbotAttachementDto {
  private Chatbot chatbot;
  private List<MultipartFile> attachements;
}
