package org.enspy.snappy.server.presentation.controllers;

import jakarta.validation.Valid;
import org.enspy.snappy.server.domain.entities.Chat;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.usecases.chat.ChangeMessagingModeUseCase;
import org.enspy.snappy.server.domain.usecases.chat.GetChatDetailsUseCase;
import org.enspy.snappy.server.domain.usecases.chat.GetUserChatsUseCase;
import org.enspy.snappy.server.domain.usecases.chat.SendMessageUseCase;
import org.enspy.snappy.server.presentation.dto.chat.ChangeMessagingModeDto;
import org.enspy.snappy.server.presentation.dto.chat.GetChatDetailsDto;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;
import org.enspy.snappy.server.presentation.dto.chat.SendMessageDto;
import org.enspy.snappy.server.presentation.resources.ChatDetailsResource;
import org.enspy.snappy.server.presentation.resources.ChatResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@Validated
@RequestMapping("/chat")
public class ChatController {

  private final GetUserChatsUseCase getUserChats;
  private final GetChatDetailsUseCase getChatDetails;
  private final SendMessageUseCase sendMessageUseCase;
  private final ChangeMessagingModeUseCase changeMessagingModeUseCase;

  public ChatController(
      GetUserChatsUseCase getUserChatsUseCase,
      GetChatDetailsUseCase getChatDetailsUseCase,
      SendMessageUseCase sendMessageUseCase,
      ChangeMessagingModeUseCase changeMessagingModeUseCase) {
    this.getUserChats = getUserChatsUseCase;
    this.getChatDetails = getChatDetailsUseCase;
    this.sendMessageUseCase = sendMessageUseCase;
    this.changeMessagingModeUseCase = changeMessagingModeUseCase;
  }

  @PostMapping("/details")
  public Mono<ResponseEntity<ChatDetailsResource>> getChatDetails(
      @Valid @RequestBody GetChatDetailsDto dto) {
    return getChatDetails.execute(dto).map(ResponseEntity::ok);
  }

  @GetMapping("/{userId}/chats")
  public Flux<ChatResource> getUserChats(
      @PathVariable String userId, @RequestParam String projectId) {
    GetUserChatsDto dto = new GetUserChatsDto(userId, projectId);
    return getUserChats.execute(dto);
  }

  @PostMapping(
      path = "/send",
      consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
  public Mono<ResponseEntity<Message>> sendMessage(@Valid @ModelAttribute SendMessageDto dto) {
    return sendMessageUseCase.execute(dto).map(ResponseEntity::ok);
  }

  @PutMapping("/changeMode")
  public Mono<ResponseEntity<Chat>> changeMessagingMode(
      @Valid @RequestBody ChangeMessagingModeDto dto) {
    return changeMessagingModeUseCase.execute(dto).map(ResponseEntity::ok);
  }
}
