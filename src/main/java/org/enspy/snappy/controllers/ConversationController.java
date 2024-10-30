package org.enspy.snappy.controllers;

import org.enspy.snappy.controllers.dto.CreateConversationDto;
import org.enspy.snappy.models.Conversation;
import org.enspy.snappy.models.Message;
import org.enspy.snappy.services.ConversationService;
import org.enspy.snappy.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/conversations")
public class ConversationController {
    @Autowired
    public ConversationService conversationService;

    @PostMapping
    public Conversation postMessage(@RequestBody CreateConversationDto conversationDto) {
        List<UUID> uuids = new ArrayList<>();
        for (String user : conversationDto.getUsers()) {
            uuids.add(UUID.fromString(user));
        }
        return conversationService.createConversation(new Conversation(UUID.randomUUID(), uuids, LocalDateTime.now(), LocalDateTime.now()));
    }

    @GetMapping("/users")
    public List<Conversation> getAllUserConversations(@RequestParam(required = true) UUID conversationUuid) {
        return conversationService.findUserConversations(conversationUuid);
    }
}
