package org.enspy.snappy.server.domain.entities;

  import com.fasterxml.jackson.annotation.JsonProperty;
  import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
  import com.fasterxml.jackson.databind.annotation.JsonSerialize;
  import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeDeserializer;
  import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeSerializer;
  import org.springframework.data.annotation.CreatedDate;
  import org.springframework.data.annotation.Id;
  import org.springframework.data.annotation.LastModifiedDate;
  import org.springframework.data.annotation.Transient;
  import org.springframework.data.relational.core.mapping.Column;
  import org.springframework.data.relational.core.mapping.Table;
  import lombok.Data;
  import java.time.LocalDateTime;
  import java.util.List;
  import java.util.UUID;

  @Data
  @Table("messages")
  public class Message {

    @Id
    private UUID id;

    @Column("project_id")
    private String projectId;

    private String body;

    @Column("is_written_by_human")
    private boolean isWrittenByHuman = true;

    @Column("ack")
    private String ack = MessageAck.SENT.name();

    @Column("sender_id")
    private UUID senderId;

    @Column("receiver_id")
    private UUID receiverId;

    @Transient
    private User sender;

    @Transient
    private User receiver;

    @Transient
    private List<MessageAttachement> messageAttachements;

    @CreatedDate
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @Column("created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @Column("updated_at")
    private LocalDateTime updatedAt;

    // Méthode pour définir l'acquittement comme enum
    public void setAck(MessageAck messageAck) {
      this.ack = messageAck.name();
    }

    // Méthode pour récupérer l'acquittement comme enum
    public MessageAck getAck() {
      return ack != null ? MessageAck.valueOf(ack) : null;
    }

    @JsonProperty("sender")
    public String getSenderProjection() {
      return sender != null ? sender.getExternalId() : null;
    }

    @JsonProperty("receiver")
    public String getReceiverProjection() {
      return receiver != null ? receiver.getExternalId() : null;
    }
  }