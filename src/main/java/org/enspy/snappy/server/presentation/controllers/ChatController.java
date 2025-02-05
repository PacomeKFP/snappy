package org.enspy.snappy.server.presentation.controllers;

import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.usecases.chat.ChangeMessagingModeUseCase;
import org.enspy.snappy.server.domain.usecases.chat.GetChatDetailsUseCase;
import org.enspy.snappy.server.domain.usecases.chat.GetUserChatsUseCase;
import org.enspy.snappy.server.domain.usecases.chat.SendMessageUseCase;
import org.enspy.snappy.server.presentation.dto.chat.GetChatDetailsDto;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;
import org.enspy.snappy.server.presentation.dto.chat.SendMessageDto;
import org.enspy.snappy.server.presentation.dto.chat.ChangeMessagingModeDto;
import org.enspy.snappy.server.presentation.resources.ChatDetailsResource;
import org.enspy.snappy.server.presentation.resources.ChatResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@Validated
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private GetChatDetailsUseCase getChatDetails;

    @Autowired
    private GetUserChatsUseCase getUserChats;

    @Autowired
    private SendMessageUseCase sendMessageUseCase;

    @Autowired
    private ChangeMessagingModeUseCase changeMessagingModeUseCase;

    /**
     * Retrieve detailed chat between two users.
     */
    @PostMapping("/details")
    public ResponseEntity<ChatDetailsResource> getChatDetails(@Valid @RequestBody GetChatDetailsDto dto) {
        ChatDetailsResource chatDetails = getChatDetails.execute(dto);
        return ResponseEntity.ok(chatDetails);
    }

    /**
     * Retrieve all active chats for a specific user.
     */
    @GetMapping("/{userId}/chats")
    public ResponseEntity<List<ChatResource>> getUserChats(@PathVariable String userId, @RequestParam String projectId) {
        GetUserChatsDto dto = new GetUserChatsDto(userId, projectId);
        List<ChatResource> chats = getUserChats.execute(dto);
        return ResponseEntity.ok(chats);
    }

    /**
     * Send a message from one user to another.
     */
    @PostMapping(path="/send", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Message> sendMessage(@Valid @ModelAttribute SendMessageDto dto) {

        return ResponseEntity.ok(sendMessageUseCase.execute(dto));
    }

    /**
     * Change the messaging mode of a conversation
     */
    @PostMapping("/changeMode")
    public ResponseEntity<Void> changeMessagingMode(@Valid @RequestBody ChangeMessagingModeDto dto) {
        changeMessagingModeUseCase.execute(dto);
        return ResponseEntity.ok().build();
    }
}