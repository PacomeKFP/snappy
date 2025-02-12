package org.enspy.snappy.server.presentation.controllers;

import jakarta.validation.Valid;
import java.util.List;
import org.enspy.snappy.server.domain.entities.Chatbot;
import org.enspy.snappy.server.domain.usecases.chatbot.CreateChatbotUseCase;
import org.enspy.snappy.server.domain.usecases.chatbot.GetAvailableLanguageModelsUseCase;
import org.enspy.snappy.server.domain.usecases.chatbot.GetChatbotsRelatedToProjectUseCase;
import org.enspy.snappy.server.presentation.dto.chatbot.CreateChatbotDto;
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

  @PostMapping("/create")
  public ResponseEntity<Chatbot> createNewChatbot(@Valid @ModelAttribute CreateChatbotDto dto) {
    return ResponseEntity.ok(createChatbotUseCase.execute(dto));
  }
}
