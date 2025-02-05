package org.enspy.snappy.server.infrastructure.repositories;

import org.enspy.snappy.server.domain.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ChatRepository extends JpaRepository<Chat, UUID> {

    Optional<Chat> findByProjectIdAndReceiverAndSender(String projectId, String receiver, String sender);
}
