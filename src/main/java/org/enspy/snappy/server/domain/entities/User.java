package org.enspy.snappy.server.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeDeserializer;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeSerializer;
import lombok.Data;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Entity
@Data
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"projectId", "login"},
                name = "uk_project_login")
})
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String projectId;
    private String externalId;
    private String avatar;
    private String displayName;
    private String email;
    private String phoneNumber;
    private String login;
    @JsonIgnore
    private String secret;
    private boolean isOnline;

    @ElementCollection
    private Map<String, String> customJson;

    @ManyToMany
    @JoinTable(
            name = "user_contacts",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "contact_id")
    )
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
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime updatedAt;

    /**
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    /**
     * @return
     */
    @Override
    public String getPassword() {
        return this.secret;
    }

    /**
     * @return
     */
    @Override
    public String getUsername() {
        return this.login;
    }
}