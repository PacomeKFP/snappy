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
@Table(name = "message_attachements")
public class MessageAttachement {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(columnDefinition = "uuid")
  private UUID id;

  private String mimetype;
  private String filename;

  @JsonIgnore private String path;

  private Long filesize;

  @ManyToOne
  @JoinColumn(name = "message_id")
  private Message message;

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
