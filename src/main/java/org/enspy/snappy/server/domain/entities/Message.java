package org.enspy.snappy.server.domain.entities;

import lombok.Data;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String uuid;

    private String projectId;
    private String body;
    private boolean isWrittenByHuman;

    @Enumerated(EnumType.STRING)
    private MessagingMode mode;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private User to;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL)
    private List<MessageMedia> medias;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
