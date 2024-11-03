package org.enspy.snappy.models;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class SubConversation {
    private UUID uuid;
    private UUID user;
    private UUID conversation;
    private Integer rank;
    private List<Message> messages;
    private ConversationMode conversationMode;
}


enum ConversationMode{
    OFF,
    LISTEN,
    ON,
}