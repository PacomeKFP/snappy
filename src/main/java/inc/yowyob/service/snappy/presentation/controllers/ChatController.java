package inc.yowyob.service.snappy.presentation.controllers;

import inc.yowyob.service.snappy.domain.entities.Chat;
import inc.yowyob.service.snappy.domain.entities.Message;
import inc.yowyob.service.snappy.domain.usecases.chat.ChangeMessagingModeUseCase;
import inc.yowyob.service.snappy.domain.usecases.chat.GetChatDetailsUseCase;
import inc.yowyob.service.snappy.domain.usecases.chat.GetUserChatsUseCase;
import inc.yowyob.service.snappy.domain.usecases.chat.SendMessageUseCase;
import inc.yowyob.service.snappy.domain.usecases.chat.UpdateMessageAck;
import inc.yowyob.service.snappy.presentation.dto.chat.ChangeMessagingModeDto;
import inc.yowyob.service.snappy.presentation.dto.chat.GetChatDetailsDto;
import inc.yowyob.service.snappy.presentation.dto.chat.GetUserChatsDto;
import inc.yowyob.service.snappy.presentation.dto.chat.SendMessageDto;
import inc.yowyob.service.snappy.presentation.dto.chat.UpdateMessageAckDto;
import inc.yowyob.service.snappy.presentation.resources.ChatDetailsResource;
import inc.yowyob.service.snappy.presentation.resources.ChatResource;
import jakarta.validation.Valid;
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
  private final UpdateMessageAck updateMessageAck;

  public ChatController(
      GetUserChatsUseCase getUserChats,
      GetChatDetailsUseCase getChatDetails,
      SendMessageUseCase sendMessageUseCase,
      ChangeMessagingModeUseCase changeMessagingModeUseCase,
      UpdateMessageAck updateMessageAck) {
    this.getUserChats = getUserChats;
    this.getChatDetails = getChatDetails;
    this.sendMessageUseCase = sendMessageUseCase;
    this.changeMessagingModeUseCase = changeMessagingModeUseCase;
    this.updateMessageAck = updateMessageAck;
  }

  /** Retrieve detailed chat between two users. */
  @PostMapping("/details")
  public Mono<ChatDetailsResource> getChatDetails(@Valid @RequestBody GetChatDetailsDto dto) {
    return getChatDetails.execute(dto);
  }

  /** Retrieve all chats for a specific user. */
  @PostMapping("/user-chats")
  public Flux<ChatResource> getUserChats(@Valid @RequestBody GetUserChatsDto dto) {
    return getUserChats.execute(dto);
  }

  /** Send a message from one user to another. */
  @PostMapping("/send-message")
  public Mono<Message> sendMessage(@Valid @RequestBody SendMessageDto dto) {
    return sendMessageUseCase.execute(dto);
  }

  /** Change the messaging mode between two users. */
  @PostMapping("/change-mode")
  public Mono<Chat> changeMessagingMode(@Valid @RequestBody ChangeMessagingModeDto dto) {
    return changeMessagingModeUseCase.execute(dto);
  }

  /** Update message acknowledgment status. */
  @PostMapping("/update-ack")
  public Mono<Message> updateMessageAck(@Valid @RequestBody UpdateMessageAckDto dto) {
    return updateMessageAck.execute(dto);
  }
}