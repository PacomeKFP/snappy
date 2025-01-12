package org.enspy.snappy.server.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Data;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeDeserializer;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeSerializer;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String projectId;
    private String body;
    private boolean isWrittenByHuman = true;

    @Enumerated(EnumType.STRING)
    private MessagingMode mode = MessagingMode.OFF;

    @Enumerated(EnumType.STRING)
    private MessageAck ack = MessageAck.SENT;

    @ManyToOne
    @JoinColumn(name = "sender")
    @JsonIgnoreProperties({"organization", "contacts", "customJson"})
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver")
    @JsonIgnoreProperties({"organization", "contacts", "customJson"})
    private User receiver;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("message")
    private List<MessageMedia> medias;

    @CreationTimestamp
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime updatedAt;

}
