package org.enspy.snappy.controllers.dto;


import lombok.Data;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class CreateMessageDto {
    private UUID author;
    private UUID conversation;
    private String content;
    private Boolean isRead;
    private UUID replyTo;

    public CreateMessageDto(UUID author, UUID conversation, String content, Boolean isRead, UUID replyTo) {
        super();
        this.author = author;
        this.conversation = conversation;
        this.content = content;
        this.isRead = isRead;
        this.replyTo = replyTo;
    }
    public CreateMessageDto(){}

}
