package inc.yowyob.service.snappy.domain.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import inc.yowyob.service.snappy.infrastructure.helpers.LocalDateTimeDeserializer;
import inc.yowyob.service.snappy.infrastructure.helpers.LocalDateTimeSerializer;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

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

  // Store as string instead of enum for R2DBC compatibility
  private String ack = "SENT"; // was MessageAck enum

  // Foreign key references - R2DBC doesn't support object references
  @Column("sender_id")
  private UUID senderId;

  @Column("receiver_id")
  private UUID receiverId;

  // Note: messageAttachements would need to be managed via separate queries

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

  // These would need to be populated via separate queries in R2DBC
  // For now, we'll handle these at the service layer
  @JsonProperty("sender")
  public UUID getSenderProjection() {
    return senderId;
  }

  @JsonProperty("receiver")  
  public UUID getReceiverProjection() {
    return receiverId;
  }
}
