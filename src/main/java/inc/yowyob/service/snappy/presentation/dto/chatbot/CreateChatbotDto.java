package inc.yowyob.service.snappy.presentation.dto.chatbot;

import inc.yowyob.service.snappy.domain.entities.ChatbotLLM;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateChatbotDto {
  @NotNull private String label;
  @NotNull private String prompt;
  @NotNull private String projectId;
  @Nullable private String description;
  @NotNull private ChatbotLLM languageModel;
  @Nullable private List<MultipartFile> attachements;
}
