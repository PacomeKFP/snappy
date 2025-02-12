package org.enspy.snappy.server.infrastructure.repositories;

import org.enspy.snappy.server.domain.entities.Chatbot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChatbotRepository extends JpaRepository<Chatbot, UUID> {
    List<Chatbot> findChatbotByProjectId(String projectId);
}
