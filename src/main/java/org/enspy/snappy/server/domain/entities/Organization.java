package org.enspy.snappy.server.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeDeserializer;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeSerializer;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "organizations")
public class Organization implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(columnDefinition = "uuid")
  private UUID id;

  private String name;
  private String email;

  @JsonIgnore private String password;

  @Column(name = "project_id", unique = true, nullable = false)
  private String projectId;

  @Column(name = "private_key")
  private String privateKey;

  @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
  @JsonIgnoreProperties({"organization", "secret"})
  private List<User> users;

  @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
  @JsonIgnoreProperties({"organization"})
  private List<Chatbot> chatbots;

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

  public Organization(String name, String email, String password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  @JsonIgnore
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  @Override
  public String getUsername() {
    return this.email;
  }

  @JsonIgnore
  @Override
  public String getPassword() {
    return this.password;
  }
}
