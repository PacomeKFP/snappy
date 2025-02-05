package org.enspy.snappy.server.infrastructure.repositories;

import java.util.Optional;
import java.util.UUID;
import org.enspy.snappy.server.domain.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, UUID> {

    Optional<Chat> findByProjectIdAndReceiverAndSender(String projectId, String receiver, String sender);
}
