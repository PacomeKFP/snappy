package inc.yowyob.service.snappy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import inc.yowyob.service.snappy.infrastructure.helpers.LocalDateTimeDeserializer;
import inc.yowyob.service.snappy.infrastructure.helpers.LocalDateTimeSerializer;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Data
@Table(
    name = "users",
    uniqueConstraints = {
      @UniqueConstraint(
          columnNames = {"project_id", "login"},
          name = "uk_project_login")
    })
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(columnDefinition = "uuid")
  private UUID id;

  @Column(name = "project_id")
  private String projectId;

  @Column(name = "external_id")
  private String externalId;

  private String avatar;

  @Column(name = "display_name")
  private String displayName;

  private String email;

  @Column(name = "phone_number")
  private String phoneNumber;

  private String login;

  @JsonIgnore private String secret;

  private boolean isOnline;

  @ElementCollection
  @CollectionTable(name = "user_custom_json", joinColumns = @JoinColumn(name = "user_id"))
  @MapKeyColumn(name = "json_key")
  @Column(name = "json_value")
  private Map<String, String> customJson;

  @ManyToMany
  @JoinTable(
      name = "user_contacts",
      joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "contact_id"))
  @JsonIgnoreProperties("contacts")
  private List<User> contacts;

  @ManyToOne
  @JoinColumn(name = "organization_id", nullable = false)
  @JsonIgnoreProperties("users")
  private Organization organization;

  @OneToMany(mappedBy = "sender")
  @JsonIgnore
  private List<Message> sentMessages;

  @OneToMany(mappedBy = "receiver")
  @JsonIgnore
  private List<Message> receivedMessages;

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

  @JsonIgnore
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  @JsonIgnore
  @Override
  public String getPassword() {
    return this.secret;
  }

  @Override
  public String getUsername() {
    return this.login + ";" + this.projectId;
  }
}
