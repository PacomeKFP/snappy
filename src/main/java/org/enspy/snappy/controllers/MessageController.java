package org.enspy.snappy.controllers;

import org.enspy.snappy.models.Message;
import org.enspy.snappy.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/messages")
public class MessageController {
    @Autowired
    public MessageService messageService;

    @PostMapping
    public Message postMessage(@RequestBody Message message) {
        return messageService.createMessage(message);
    }

    @GetMapping("/paginate")
    public List<Message> getAllMessages(@RequestParam(required = true) UUID conversationUuid,
                                        @RequestParam(required = true) UUID fromMessage,
                                        @RequestParam(defaultValue = "5") int limit) {
        return messageService.findMessagesForConversation(conversationUuid, fromMessage, limit);
    }

    @GetMapping("/unread")
    public List<Message> getUnreadMessages(@RequestParam(required = true) UUID conversationUuid) {
        return messageService.findUnreadMessages(conversationUuid);
    }

}
