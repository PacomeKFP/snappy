package org.enspy.snappy.server.presentation.controllers;

import jakarta.validation.Valid;
import java.util.List;
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

@RestController
@Validated
@RequestMapping("/chat")
public class ChatController {

  private final GetUserChatsUseCase getUserChats;
  private final GetChatDetailsUseCase getChatDetails;
  private final SendMessageUseCase sendMessageUseCase;
  private final ChangeMessagingModeUseCase changeMessagingModeUseCase;

  public ChatController(GetUserChatsUseCase getUserChats, GetChatDetailsUseCase getChatDetails, SendMessageUseCase sendMessageUseCase, ChangeMessagingModeUseCase changeMessagingModeUseCase) {
    this.getUserChats = getUserChats;
    this.getChatDetails = getChatDetails;
    this.sendMessageUseCase = sendMessageUseCase;
    this.changeMessagingModeUseCase = changeMessagingModeUseCase;
  }


  /** Retrieve detailed chat between two users. */
  @PostMapping("/details")
  public ResponseEntity<ChatDetailsResource> getChatDetails(
      @Valid @RequestBody GetChatDetailsDto dto) {
    ChatDetailsResource chatDetails = getChatDetails.execute(dto);
    return ResponseEntity.ok(chatDetails);
  }

  /** Retrieve all active chats for a specific user. */
  @GetMapping("/{userId}/chats")
  public ResponseEntity<List<ChatResource>> getUserChats(
      @PathVariable String userId, @RequestParam String projectId) {
    GetUserChatsDto dto = new GetUserChatsDto(userId, projectId);
    return ResponseEntity.ok(getUserChats.execute(dto));
  }

  /** Send a message from one user to another. */
  @PostMapping(
      path = "/send",
      consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
  public ResponseEntity<Message> sendMessage(@Valid @ModelAttribute SendMessageDto dto) {

    return ResponseEntity.ok(sendMessageUseCase.execute(dto));
  }

  /** Change the messaging mode of a conversation */
  @PutMapping("/changeMode")
  public ResponseEntity<Chat> changeMessagingMode(@Valid @RequestBody ChangeMessagingModeDto dto) {
    return ResponseEntity.ok(changeMessagingModeUseCase.execute(dto));
  }
}
