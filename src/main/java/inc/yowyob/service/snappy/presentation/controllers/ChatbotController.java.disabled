package inc.yowyob.service.snappy.presentation.controllers;

import inc.yowyob.service.snappy.domain.entities.Chatbot;
import inc.yowyob.service.snappy.domain.usecases.chatbot.CreateChatbotUseCase;
import inc.yowyob.service.snappy.domain.usecases.chatbot.GetAvailableLanguageModelsUseCase;
import inc.yowyob.service.snappy.domain.usecases.chatbot.GetChatbotsRelatedToProjectUseCase;
import inc.yowyob.service.snappy.presentation.dto.chatbot.CreateChatbotDto;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chatbot")
public class ChatbotController {

  private final CreateChatbotUseCase createChatbotUseCase;
  private final GetAvailableLanguageModelsUseCase getAvailableLanguageModelsUseCase;
  private final GetChatbotsRelatedToProjectUseCase getChatbotsRelatedToProjectUseCase;

  public ChatbotController(
      CreateChatbotUseCase createChatbotUseCase,
      GetAvailableLanguageModelsUseCase getAvailableLanguageModelsUseCase,
      GetChatbotsRelatedToProjectUseCase getChatbotsRelatedToProjectUseCase) {
    this.createChatbotUseCase = createChatbotUseCase;
    this.getAvailableLanguageModelsUseCase = getAvailableLanguageModelsUseCase;
    this.getChatbotsRelatedToProjectUseCase = getChatbotsRelatedToProjectUseCase;
  }

  @GetMapping
  public ResponseEntity<List<Chatbot>> getAllChatbots() {
    return ResponseEntity.ok(this.getChatbotsRelatedToProjectUseCase.execute(null));
  }

  @GetMapping("/project-chatbot/:projectId")
  public ResponseEntity<List<Chatbot>> getChatbotsRelatedToProject(
      @RequestParam(required = true) String projectId) {
    return ResponseEntity.ok(this.getChatbotsRelatedToProjectUseCase.execute(projectId));
  }

  @GetMapping("/available-models")
  public ResponseEntity<List<String>> getAvailableLanguageModels() {
    return ResponseEntity.ok(getAvailableLanguageModelsUseCase.execute(null));
  }

  @PostMapping
  public ResponseEntity<Chatbot> createNewChatbot(@Valid @ModelAttribute CreateChatbotDto dto) {
    return ResponseEntity.ok(createChatbotUseCase.execute(dto));
  }
}
