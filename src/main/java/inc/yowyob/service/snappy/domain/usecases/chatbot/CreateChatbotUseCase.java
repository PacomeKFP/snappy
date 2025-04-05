package inc.yowyob.service.snappy.domain.usecases.chatbot;

import inc.yowyob.service.snappy.domain.entities.Chatbot;
import inc.yowyob.service.snappy.domain.entities.ChatbotAttachement;
import inc.yowyob.service.snappy.domain.entities.Organization;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.ChatbotRepository;
import inc.yowyob.service.snappy.infrastructure.repositories.OrganizationRepository;
import inc.yowyob.service.snappy.presentation.dto.chatbot.CreateChatbotDto;
import inc.yowyob.service.snappy.presentation.dto.chatbot.SaveChatbotAttachementDto;
import java.util.List;
import java.util.UUID;
import lombok.extern.log4j.Log4j2;
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
    Organization organization =
        organizationRepository
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
