package org.enspy.snappy.server.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@Table("users")
public class User implements UserDetails {

  @Id private UUID id;

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

  @JsonIgnore private String secret;

  private boolean isOnline;

  // Les collections ne peuvent pas être mappées directement avec R2DBC
  // Ces relations devront être gérées manuellement
  @Transient
  @JsonIgnore private transient Map<String, String> customJson;

  @Transient
  @JsonIgnore private transient List<User> contacts;

  @Column("organization_id")
  private UUID organizationId;

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

  @JsonIgnore
  @Override
  public String getUsername() {
    return this.login + ";" + this.projectId;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isEnabled() {
    return true;
  }
}
