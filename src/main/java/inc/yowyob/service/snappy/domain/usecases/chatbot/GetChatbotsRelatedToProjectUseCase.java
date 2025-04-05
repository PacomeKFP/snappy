package inc.yowyob.service.snappy.domain.usecases.chatbot;

import inc.yowyob.service.snappy.domain.entities.Chatbot;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.ChatbotRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class GetChatbotsRelatedToProjectUseCase implements UseCase<String, List<Chatbot>> {

  private final ChatbotRepository chatbotRepository;

  public GetChatbotsRelatedToProjectUseCase(ChatbotRepository chatbotRepository) {
    this.chatbotRepository = chatbotRepository;
  }

  @Override
  public List<Chatbot> execute(String projectId) {
    if (projectId == null || projectId.isEmpty()) {
      return chatbotRepository.findAll();
    }
    return chatbotRepository.findChatbotByProjectId(projectId);
  }
}
