package org.enspy.snappy.server.infrastructure.repositories;

import java.util.UUID;
import org.enspy.snappy.server.domain.entities.ChatbotAttachement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatbotAttachementRepository extends JpaRepository<ChatbotAttachement, UUID> {
}
