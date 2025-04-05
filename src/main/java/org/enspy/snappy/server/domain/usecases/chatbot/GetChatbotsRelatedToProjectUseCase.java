package org.enspy.snappy.server.domain.usecases.chatbot;

import org.enspy.snappy.server.domain.entities.Chatbot;
import org.enspy.snappy.server.domain.usecases.FluxUseCase;
import org.enspy.snappy.server.infrastructure.repositories.ChatbotRepository;
import org.enspy.snappy.server.infrastructure.services.RelationshipService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class GetChatbotsRelatedToProjectUseCase implements FluxUseCase<String, Chatbot> {

  private final ChatbotRepository chatbotRepository;
  private final RelationshipService relationshipService;

  public GetChatbotsRelatedToProjectUseCase(
      ChatbotRepository chatbotRepository, RelationshipService relationshipService) {
    this.chatbotRepository = chatbotRepository;
    this.relationshipService = relationshipService;
  }

  @Override
  public Flux<Chatbot> execute(String projectId) {
    Flux<Chatbot> chatbots =
        projectId == null || projectId.isEmpty()
            ? chatbotRepository.findAll()
            : chatbotRepository.findChatbotByProjectId(projectId);

    return chatbots.flatMap(relationshipService::loadChatbotWithRelations);
  }
}
