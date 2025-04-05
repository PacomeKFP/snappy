package inc.yowyob.service.snappy.domain.entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import inc.yowyob.service.snappy.infrastructure.helpers.LocalDateTimeDeserializer;
import inc.yowyob.service.snappy.infrastructure.helpers.LocalDateTimeSerializer;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
    name = "chats",
    uniqueConstraints = {
      @UniqueConstraint(
          name = "uk_chat_project_sender_receiver",
          columnNames = {"project_id", "sender", "receiver"})
    })
public class Chat {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(columnDefinition = "uuid")
  private UUID id;

  @Column(name = "project_id", nullable = false)
  private String projectId;

  @Column(nullable = false)
  private String sender;

  @Column(nullable = false)
  private String receiver;

  @Enumerated(EnumType.STRING)
  private MessagingMode mode;

  @CreationTimestamp
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  @JsonDeserialize(using = LocalDateTimeDeserializer.class)
  @Column(columnDefinition = "TIMESTAMP")
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  @JsonDeserialize(using = LocalDateTimeDeserializer.class)
  @Column(columnDefinition = "TIMESTAMP")
  private LocalDateTime updatedAt;
}
