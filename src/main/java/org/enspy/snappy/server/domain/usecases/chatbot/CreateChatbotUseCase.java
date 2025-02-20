package org.enspy.snappy.server.domain.usecases.chatbot;

import java.util.List;
import java.util.UUID;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.entities.Chatbot;
import org.enspy.snappy.server.domain.entities.ChatbotAttachement;
import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.ChatbotRepository;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.presentation.dto.chatbot.CreateChatbotDto;
import org.enspy.snappy.server.presentation.dto.chatbot.SaveChatbotAttachementDto;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class CreateChatbotUseCase implements UseCase<CreateChatbotDto, Chatbot> {

  private final ChatbotRepository chatbotRepository;
  private final OrganizationRepository organizationRepository;
  private final SaveChatbotAttachementUseCase saveChatbotAttachementUseCase;

  public CreateChatbotUseCase(
      ChatbotRepository chatbotRepository,
      OrganizationRepository organizationRepository,
      SaveChatbotAttachementUseCase saveChatbotAttachementUseCase) {
    this.chatbotRepository = chatbotRepository;
    this.organizationRepository = organizationRepository;
    this.saveChatbotAttachementUseCase = saveChatbotAttachementUseCase;
  }

  @Override
  public Chatbot execute(CreateChatbotDto dto) {
    Organization organization = organizationRepository
        .findByProjectId(dto.getProjectId())
        .orElseThrow(() -> new IllegalArgumentException("Project not found"));
    Chatbot chatbot = this.persistChatbot(dto, organization);
    this.saveChatbotAttachements(dto, chatbot);
    this.sendChatbotDetailToAlan(chatbot);
    return chatbot;
  }

  private Chatbot persistChatbot(CreateChatbotDto dto, Organization organization) {
    Chatbot chatbot = new Chatbot();
    chatbot.setLabel(dto.getLabel());
    chatbot.setPrompt(dto.getPrompt());
    chatbot.setOrganization(organization);
    chatbot.setProjectId(dto.getProjectId());
    chatbot.setDescription(dto.getDescription());
    chatbot.setLanguageModel(dto.getLanguageModel());
    chatbot.setAccessKey(UUID.randomUUID().toString());
    return chatbotRepository.save(chatbot);
  }

  private void saveChatbotAttachements(CreateChatbotDto dto, Chatbot chatbot) {
    if (dto.getAttachements() != null && !dto.getAttachements().isEmpty()) {
      List<ChatbotAttachement> chatbotAttachements =
          saveChatbotAttachementUseCase.execute(
              new SaveChatbotAttachementDto(chatbot, dto.getAttachements()));
      chatbot.setChatbotAttachements(chatbotAttachements);
    }
  }

  private void sendChatbotDetailToAlan(Chatbot chatbot) {

    log.warn("Sending chatbot detail to alan -- Unimplemented");
  }
}
