package org.enspy.snappy.server.domain.entities;

import lombok.Data;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
public class MessageMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String uuid;

    private String projectId;
    private String mimetype;

    @Lob
    private String data;
    private String filename;
    private Long filesize;

    @ManyToOne
    @JoinColumn(name = "message_id")
    private Message message;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

