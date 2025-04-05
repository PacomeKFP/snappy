package inc.yowyob.service.snappy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import inc.yowyob.service.snappy.infrastructure.helpers.LocalDateTimeDeserializer;
import inc.yowyob.service.snappy.infrastructure.helpers.LocalDateTimeSerializer;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
@Table(name = "chatbot_attachements")
public class ChatbotAttachement {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(columnDefinition = "uuid")
  private UUID id;

  private Long filesize;
  private String mimetype;
  private String filename;

  @JsonIgnore private String path;

  @ManyToOne
  @JoinColumn(name = "chatbot_id")
  private Chatbot chatbot;

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

  @JsonProperty("path")
  public String getPath() {
    return path;
  }
}
