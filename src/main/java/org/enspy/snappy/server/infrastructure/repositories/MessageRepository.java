package org.enspy.snappy.server.infrastructure.repositories;

import java.util.UUID;
import org.enspy.snappy.server.domain.entities.Message;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface MessageRepository extends R2dbcRepository<Message, UUID> {
  Flux<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
      UUID senderId1, UUID receiverId1, UUID senderId2, UUID receiverId2);

  Flux<Message> findBySenderIdOrReceiverId(UUID senderId, UUID receiverId);
}
