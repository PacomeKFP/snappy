package org.enspy.snappy.controllers;

import org.enspy.snappy.controllers.dto.CreateConversationDto;
import org.enspy.snappy.models.Conversation;
import org.enspy.snappy.services.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/conversations")
public class ConversationController {
    @Autowired
    public ConversationService conversationService;

    @PostMapping
    public Conversation postMessage(@RequestBody CreateConversationDto conversationDto) {
        return conversationService.createConversation(conversationDto);
    }

    @PatchMapping("/{conversationUid}")
    public Integer switchSnappyStatus(@PathVariable UUID conversationUid, @RequestParam(required = true) UUID userUuid) {
        return conversationService.switchSnappyStatus(conversationUid, userUuid);
    }



    @GetMapping("/users")
    public List<Conversation> getAllUserConversations(@RequestParam(required = true) UUID userUid) {
        return conversationService.findUserConversations(userUid);
    }
    @PostMapping("/normalize")
    public List<Conversation> normalizeMessages() {
        return conversationService.normalize();
    }
}
