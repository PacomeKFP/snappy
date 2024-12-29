package org.enspy.snappy.server.domain.entities;

import lombok.Builder;
import lombok.Data;
import jakarta.persistence.*;
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
    private boolean isWrittenByHuman = false;

    @Enumerated(EnumType.STRING)
    private MessagingMode mode = MessagingMode.OFF;

    @Enumerated(EnumType.STRING)
    private MessageAck ack = MessageAck.SENT;

    @ManyToOne
    @JoinColumn(name = "sender")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver")
    private User receiver;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL)
    private List<MessageMedia> medias;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
