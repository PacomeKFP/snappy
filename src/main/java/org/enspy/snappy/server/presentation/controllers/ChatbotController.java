package org.enspy.snappy.server.presentation.controllers;

import jakarta.validation.Valid;
import org.enspy.snappy.server.domain.entities.Chatbot;
import org.enspy.snappy.server.domain.usecases.chatbot.CreateChatbotUseCase;
import org.enspy.snappy.server.domain.usecases.chatbot.GetAvailableLanguageModelsUseCase;
import org.enspy.snappy.server.domain.usecases.chatbot.GetChatbotsRelatedToProjectUseCase;
import org.enspy.snappy.server.presentation.dto.chatbot.CreateChatbotDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
  public Flux<Chatbot> getAllChatbots() {
    return getChatbotsRelatedToProjectUseCase.execute(null);
  }

  @GetMapping("/project-chatbot/{projectId}")
  public Flux<Chatbot> getChatbotsRelatedToProject(@PathVariable String projectId) {
    return getChatbotsRelatedToProjectUseCase.execute(projectId);
  }

  @GetMapping("/available-models")
  public Flux<String> getAvailableLanguageModels() {
    return getAvailableLanguageModelsUseCase.execute(null);
  }

  @PostMapping
  public Mono<ResponseEntity<Chatbot>> createNewChatbot(
      @Valid @ModelAttribute CreateChatbotDto dto) {
    return createChatbotUseCase.execute(dto).map(ResponseEntity::ok);
  }
}
