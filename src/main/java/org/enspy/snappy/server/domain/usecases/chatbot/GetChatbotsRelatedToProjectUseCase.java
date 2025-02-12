package org.enspy.snappy.server.domain.usecases.chatbot;

import java.util.List;
import org.enspy.snappy.server.domain.entities.Chatbot;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.ChatbotRepository;
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
