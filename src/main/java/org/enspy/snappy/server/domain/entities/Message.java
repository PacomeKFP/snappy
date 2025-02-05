package org.enspy.snappy.server.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Data;
import org.enspy.snappy.server.domain.projections.UserProjection;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeDeserializer;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeSerializer;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
  private List<Attachement> attachements;

  @CreationTimestamp
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  @JsonDeserialize(using = LocalDateTimeDeserializer.class)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  @JsonDeserialize(using = LocalDateTimeDeserializer.class)
  private LocalDateTime updatedAt;

  // Projection sur le sender pour JSON
  @JsonProperty("sender")
  public UserProjection getSenderProjection() {
    return sender != null ? new UserProjection(sender) : null;
  }

  // Projection sur le receiver pour JSON
  @JsonProperty("receiver")
  public UserProjection getReceiverProjection() {
    return receiver != null ? new UserProjection(receiver) : null;
  }
}
