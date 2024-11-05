package org.enspy.snappy.controllers.presenters;

import org.enspy.snappy.models.Message;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public class GetMessagePresenter {
    private UUID uuid;
    private UUID author;
    private UUID conversation;
    private String content;
    private Boolean isRead;
    private UUID replyTo;
    private String createdAt;
    private String updatedAt;

    public GetMessagePresenter(UUID uuid, UUID author, UUID conversation, String content, Boolean isRead, UUID replyTo, String createdAt, String updatedAt) {
        super();
        this.uuid= uuid;
        this.author = author;
        this.conversation = conversation;
        this.content = content;
        this.isRead = isRead;
        this.replyTo = replyTo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static GetMessagePresenter fromMessage(Message message) {
        return new GetMessagePresenter(message.getUuid(), message.getAuthor(), message.getConversation(), message.getContent(), message.getIsRead(), message.getReplyTo(), message.getCreatedAt().toString(), message.getUpdatedAt().toString());
    }

    public GetMessagePresenter() {}

}
