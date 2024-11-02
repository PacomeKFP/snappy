package org.enspy.snappy.controllers;

import org.enspy.snappy.models.Conversation;
import org.enspy.snappy.models.Message;
import org.enspy.snappy.services.ConversationService;
import org.enspy.snappy.services.MessageService;
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
    public Conversation postMessage(@RequestBody Conversation conversation) {
        return conversationService.createConversation(conversation);
    }

    @GetMapping("/users")
    public List<Conversation> getAllUserConversations(@RequestParam(required = true) UUID conversationUuid) {
        return conversationService.findUserConversations(conversationUuid);
    }
}
