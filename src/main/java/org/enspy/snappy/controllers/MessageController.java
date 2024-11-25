package org.enspy.snappy.controllers;

import org.enspy.snappy.controllers.dto.CreateMessageDto;
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
    public Message postMessage(@RequestBody CreateMessageDto messageDto) {
        return messageService.createMessage(messageDto);
    }

    @GetMapping("/paginate")
    public List<Message> getAllMessages(@RequestParam(required = true) UUID conversationUuid,
                                        @RequestParam(required = true) UUID fromMessage,
                                        @RequestParam(defaultValue = "5") int limit) {
        return messageService.findMessagesForConversation(conversationUuid, fromMessage, limit);
    }

    @GetMapping("/conversation")
    public List<Message> getAllMessages(@RequestParam(required = true) UUID conversationUuid) {
        return messageService.findMessagesByConversation(conversationUuid);
    }

    @GetMapping("/unread")
    public List<Message> getUnreadMessages(
            @RequestParam(required = true) UUID conversationUuid,
            @RequestParam(required = true) UUID userUuid) {
        return messageService.findUnreadMessages(conversationUuid, userUuid);
    }

}
