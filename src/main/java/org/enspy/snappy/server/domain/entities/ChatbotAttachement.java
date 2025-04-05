package org.enspy.snappy.server.domain.entities;

  import com.fasterxml.jackson.annotation.JsonIgnore;
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
  import java.util.UUID;

  @Data
  @Table("chatbot_attachements")
  public class ChatbotAttachement {

    @Id
    private UUID id;

    private Long filesize;
    private String mimetype;
    private String filename;

    @JsonIgnore
    private String path;

    @Column("chatbot_id")
    private UUID chatbotId;

    @Transient
    private Chatbot chatbot;

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

    @JsonProperty("path")
    public String getPath() {
      return path;
    }
  }