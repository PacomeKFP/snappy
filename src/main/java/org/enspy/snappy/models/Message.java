package org.enspy.snappy.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Table
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @PrimaryKey
    UUID uuid = UUID.randomUUID();
    private UUID author;
    private UUID conversation;

    String content; // le contenu en texte du message
    private Boolean isRead;
    private UUID replyTo;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt= LocalDateTime.now();
//    private MessageStatus status;

}
