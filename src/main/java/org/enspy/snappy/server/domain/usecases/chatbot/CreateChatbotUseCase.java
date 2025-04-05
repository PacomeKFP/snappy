package org.enspy.snappy.server.domain.usecases.chatbot;

import java.util.UUID;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.entities.Chatbot;
import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.repositories.ChatbotRepository;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.infrastructure.services.RelationshipService;
import org.enspy.snappy.server.presentation.dto.chatbot.CreateChatbotDto;
import org.enspy.snappy.server.presentation.dto.chatbot.SaveChatbotAttachementDto;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Log4j2
@Service
public class CreateChatbotUseCase implements MonoUseCase<CreateChatbotDto, Chatbot> {

  private final ChatbotRepository chatbotRepository;
  private final OrganizationRepository organizationRepository;
  private final SaveChatbotAttachementUseCase saveChatbotAttachementUseCase;
  private final RelationshipService relationshipService;

  public CreateChatbotUseCase(
      ChatbotRepository chatbotRepository,
      OrganizationRepository organizationRepository,
      SaveChatbotAttachementUseCase saveChatbotAttachementUseCase,
      RelationshipService relationshipService) {
    this.chatbotRepository = chatbotRepository;
    this.organizationRepository = organizationRepository;
    this.saveChatbotAttachementUseCase = saveChatbotAttachementUseCase;
    this.relationshipService = relationshipService;
  }

  @Override
  public Mono<Chatbot> execute(CreateChatbotDto dto) {
    return organizationRepository
        .findByProjectId(dto.getProjectId())
        .switchIfEmpty(Mono.error(new IllegalArgumentException("Project not found")))
        .flatMap(organization -> persistChatbot(dto, organization))
        .flatMap(
            chatbot -> {
              if (dto.getAttachements() != null && !dto.getAttachements().isEmpty()) {
                return saveChatbotAttachements(dto, chatbot).then(Mono.just(chatbot));
              }
              return Mono.just(chatbot);
            })
        .doOnNext(this::sendChatbotDetailToAlan)
        .flatMap(relationshipService::loadChatbotWithRelations);
  }

  private Mono<Chatbot> persistChatbot(CreateChatbotDto dto, Organization organization) {
    Chatbot chatbot = new Chatbot();
    chatbot.setLabel(dto.getLabel());
    chatbot.setPrompt(dto.getPrompt());
    chatbot.setOrganizationId(organization.getId());
    chatbot.setProjectId(dto.getProjectId());
    chatbot.setDescription(dto.getDescription());
    chatbot.setLanguageModel(dto.getLanguageModel());
    chatbot.setAccessKey(UUID.randomUUID().toString());

    return chatbotRepository.save(chatbot);
  }

  private Mono<Void> saveChatbotAttachements(CreateChatbotDto dto, Chatbot chatbot) {
    return saveChatbotAttachementUseCase
        .execute(new SaveChatbotAttachementDto(chatbot, dto.getAttachements()))
        .collectList()
        .doOnNext(chatbot::setChatbotAttachements)
        .then();
  }

  private void sendChatbotDetailToAlan(Chatbot chatbot) {
    log.warn("Sending chatbot detail to alan -- Unimplemented");
    // Implémentation future avec reactive HTTP client
  }
}
