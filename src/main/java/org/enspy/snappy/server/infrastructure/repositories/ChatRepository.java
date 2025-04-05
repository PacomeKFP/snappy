package org.enspy.snappy.server.infrastructure.repositories;

import java.util.UUID;
import org.enspy.snappy.server.domain.entities.Chat;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Mono;

public interface ChatRepository extends R2dbcRepository<Chat, UUID> {
  Mono<Chat> findByProjectIdAndReceiverAndSender(String projectId, String receiver, String sender);
}
