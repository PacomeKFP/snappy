package org.enspy.snappy.server.domain.entities;

  import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
  import com.fasterxml.jackson.databind.annotation.JsonSerialize;
  import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeDeserializer;
  import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeSerializer;
  import org.springframework.data.annotation.CreatedDate;
  import org.springframework.data.annotation.Id;
  import org.springframework.data.annotation.LastModifiedDate;
  import org.springframework.data.relational.core.mapping.Column;
  import org.springframework.data.relational.core.mapping.Table;
  import lombok.AllArgsConstructor;
  import lombok.Data;
  import lombok.NoArgsConstructor;
  import java.time.LocalDateTime;
  import java.util.UUID;

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Table("chats")
  public class Chat {

    @Id
    private UUID id;

    @Column("project_id")
    private String projectId;

    private String sender;

    private String receiver;

    @Column("mode")
    private String mode;

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

    // Méthode utilitaire pour définir le mode comme enum
    public void setMode(MessagingMode messagingMode) {
      this.mode = messagingMode.name();
    }

    // Méthode utilitaire pour récupérer le mode comme enum
    public MessagingMode getMode() {
      return mode != null ? MessagingMode.valueOf(mode) : null;
    }
  }