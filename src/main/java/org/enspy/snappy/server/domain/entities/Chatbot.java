package org.enspy.snappy.server.domain.entities;

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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("chatbots")
public class Chatbot {

  @Id
  private UUID id;

  private String label;
  private String prompt;
  private String description;

  @Column("project_id")
  private String projectId;

  @Column("language_model")
  private String languageModel;

  @Column("access_key")
  private String accessKey;

  @Transient
  private List<ChatbotAttachement> chatbotAttachements;

  @Column("organization_id")
  private UUID organizationId;

  @Transient
  private Organization organization;

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

  // Méthode utilitaire pour définir le LLM comme enum
  public void setLanguageModel(ChatbotLLM llm) {
    this.languageModel = llm.name();
  }

  // Méthode utilitaire pour récupérer le LLM comme enum
  public ChatbotLLM getLanguageModel() {
    return languageModel != null ? ChatbotLLM.valueOf(languageModel) : null;
  }
}