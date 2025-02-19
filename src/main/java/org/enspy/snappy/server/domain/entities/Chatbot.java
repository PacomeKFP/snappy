package org.enspy.snappy.server.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeDeserializer;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeSerializer;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chatbots")
public class Chatbot {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(columnDefinition = "uuid")
  private UUID id;

  private String label;
  private String prompt;
  private String description;

  @Column(name = "project_id")
  private String projectId;

  @Enumerated(EnumType.STRING)
  private ChatbotLLM languageModel;

  @OneToMany(mappedBy = "chatbot", cascade = CascadeType.ALL)
  @JsonIgnoreProperties("chatbot")
  private List<ChatbotAttachement> chatbotAttachements;

  @ManyToOne
  @JoinColumn(name = "organization_id", nullable = false)
  @JsonIgnore
  private Organization organization;

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
}
