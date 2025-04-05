package org.enspy.snappy.server.infrastructure.repositories;

import java.util.UUID;
import org.enspy.snappy.server.domain.entities.Chatbot;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;

public interface ChatbotRepository extends R2dbcRepository<Chatbot, UUID> {
  Flux<Chatbot> findChatbotByProjectId(String projectId);
}
