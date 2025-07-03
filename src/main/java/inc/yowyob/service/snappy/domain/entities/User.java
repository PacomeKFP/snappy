package inc.yowyob.service.snappy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import inc.yowyob.service.snappy.infrastructure.helpers.LocalDateTimeDeserializer;
import inc.yowyob.service.snappy.infrastructure.helpers.LocalDateTimeSerializer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("users")
public class User {

  @Id
  private UUID id;

  @Column("project_id")
  private String projectId;

  @Column("external_id")
  private String externalId;

  private String avatar;

  @Column("display_name")
  private String displayName;

  private String email;

  @Column("phone_number")
  private String phoneNumber;

  private String login;

  @JsonIgnore 
  private String secret;

  private boolean isOnline;

  // Note: R2DBC doesn't support @ElementCollection and complex mappings
  // Custom JSON fields would need to be handled as JSON strings or separate tables
  // For now, commenting out the complex mappings
  // private Map<String, String> customJson;
  // private List<User> contacts;
  // private Organization organization;
  // private List<Message> sentMessages;
  // private List<Message> receivedMessages;

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
}
