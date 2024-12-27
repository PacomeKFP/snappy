package org.enspy.snappy.server.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Entity
@Data
public class User {
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
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}