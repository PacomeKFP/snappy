package org.enspy.snappy.server.presentation.controllers;

import jakarta.validation.Valid;
import org.enspy.snappy.server.domain.entities.Chat;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.MessageAttachement;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.chat.ChangeMessagingModeUseCase;
import org.enspy.snappy.server.domain.usecases.chat.GetChatDetailsUseCase;
import org.enspy.snappy.server.domain.usecases.chat.GetUserChatsUseCase;
import org.enspy.snappy.server.domain.usecases.chat.SendMessageUseCase;
import org.enspy.snappy.server.presentation.dto.chat.ChangeMessagingModeDto;
import org.enspy.snappy.server.presentation.dto.chat.GetChatDetailsDto;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;
import org.enspy.snappy.server.presentation.dto.chat.SendMessageDto;
import org.enspy.snappy.server.presentation.dto.chat.response.*;
import org.enspy.snappy.server.presentation.resources.ChatDetailsResource;
import org.enspy.snappy.server.presentation.resources.ChatResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Validated
@RequestMapping("/chat")
public class ChatController {

  private final GetUserChatsUseCase getUserChatsUseCase;
  private final GetChatDetailsUseCase getChatDetailsUseCase;
  private final SendMessageUseCase sendMessageUseCase;
  private final ChangeMessagingModeUseCase changeMessagingModeUseCase;

  public ChatController(
      GetUserChatsUseCase getUserChatsUseCase,
      GetChatDetailsUseCase getChatDetailsUseCase,
      SendMessageUseCase sendMessageUseCase,
      ChangeMessagingModeUseCase changeMessagingModeUseCase) {
    this.getUserChatsUseCase = getUserChatsUseCase;
    this.getChatDetailsUseCase = getChatDetailsUseCase;
    this.sendMessageUseCase = sendMessageUseCase;
    this.changeMessagingModeUseCase = changeMessagingModeUseCase;
  }

  // Helper method to map User entity to ChatUserData DTO
  private ChatUserData mapUserToChatUserData(User user) {
    if (user == null) {
      return null;
    }
    return ChatUserData.builder()
        .id(user.getId())
        .projectId(user.getProjectId())
        .externalId(user.getExternalId())
        .avatar(user.getAvatar())
        .displayName(user.getDisplayName())
        .email(user.getEmail())
        .phoneNumber(user.getPhoneNumber())
        .login(user.getLogin())
        .isOnline(user.isOnline())
        .organizationId(user.getOrganizationId())
        .createdAt(user.getCreatedAt())
        .updatedAt(user.getUpdatedAt())
        .build();
  }

  // Helper method to map MessageAttachement entity to MessageAttachementResponse DTO
  private MessageAttachementResponse mapMessageAttachementToResponse(
      MessageAttachement attachment) {
    if (attachment == null) {
      return null;
    }
    return MessageAttachementResponse.builder()
        .id(attachment.getId())
        .mimetype(attachment.getMimetype())
        .filename(attachment.getFilename())
        .path(attachment.getPath())
        .filesize(attachment.getFilesize())
        .messageId(attachment.getMessageId())
        .createdAt(attachment.getCreatedAt())
        .updatedAt(attachment.getUpdatedAt())
        .build();
  }

  // Helper method to map Message entity to MessageResponse DTO
  private MessageResponse mapMessageToMessageResponse(Message message) {
    if (message == null) {
      return null;
    }
    List<MessageAttachementResponse> attachmentResponses =
        message.getMessageAttachements() == null
            ? Collections.emptyList()
            : message.getMessageAttachements().stream()
                .map(this::mapMessageAttachementToResponse)
                .collect(Collectors.toList());

    return MessageResponse.builder()
        .id(message.getId())
        .projectId(message.getProjectId())
        .body(message.getBody())
        .isWrittenByHuman(message.isWrittenByHuman())
        .ack(message.getAck() != null ? message.getAck().name() : null)
        .senderExternalId(message.getSenderProjection()) // Already projected in entity
        .receiverExternalId(message.getReceiverProjection()) // Already projected in entity
        .senderId(message.getSenderId()) // Direct FK
        .receiverId(message.getReceiverId()) // Direct FK
        .messageAttachements(attachmentResponses)
        .createdAt(message.getCreatedAt())
        .updatedAt(message.getUpdatedAt())
        .build();
  }

  @PostMapping("/details")
  public Mono<ResponseEntity<GetChatDetailsResponse>> getChatDetails(
      @Valid @RequestBody GetChatDetailsDto dto) {
    return getChatDetailsUseCase
        .execute(dto)
        .map(
            chatDetailsResource -> {
              ChatUserData userData = mapUserToChatUserData(chatDetailsResource.getUser());
              List<MessageResponse> messageResponses =
                  chatDetailsResource.getMessages() == null
                      ? Collections.emptyList()
                      : chatDetailsResource.getMessages().stream()
                          .map(this::mapMessageToMessageResponse)
                          .collect(Collectors.toList());
              return ResponseEntity.ok(
                  GetChatDetailsResponse.builder()
                      .userData(userData)
                      .messages(messageResponses)
                      .build());
            });
  }

  @GetMapping("/{userId}/chats")
  public Flux<GetUserChatsResponse> getUserChats(
      @PathVariable String userId, @RequestParam String projectId) {
    GetUserChatsDto dto = new GetUserChatsDto(userId, projectId);
    return getUserChatsUseCase
        .execute(dto)
        .map(
            chatResource -> {
              ChatUserData userData = mapUserToChatUserData(chatResource.getUser());
              MessageResponse lastMessageResponse =
                  mapMessageToMessageResponse(chatResource.getLastMessage());
              return GetUserChatsResponse.builder()
                  .userData(userData)
                  .lastMessage(lastMessageResponse)
                  .build();
            });
  }

  @PostMapping(
      path = "/send",
      consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
  public Mono<ResponseEntity<MessageResponse>> sendMessage(@Valid @ModelAttribute SendMessageDto dto) {
    return sendMessageUseCase.execute(dto).map(this::mapMessageToMessageResponse).map(ResponseEntity::ok);
  }

  @PutMapping("/changeMode")
  public Mono<ResponseEntity<ChangeMessagingModeResponse>> changeMessagingMode(
      @Valid @RequestBody ChangeMessagingModeDto dto) {
    return changeMessagingModeUseCase
        .execute(dto)
        .map(
            chat ->
                ResponseEntity.ok(
                    ChangeMessagingModeResponse.builder()
                        .id(chat.getId())
                        .projectId(chat.getProjectId())
                        .sender(chat.getSender())
                        .receiver(chat.getReceiver())
                        .mode(chat.getMode() != null ? chat.getMode().name() : null)
                        .createdAt(chat.getCreatedAt())
                        .updatedAt(chat.getUpdatedAt())
                        .build()));
  }
}
