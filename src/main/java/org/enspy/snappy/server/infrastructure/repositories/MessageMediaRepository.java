package org.enspy.snappy.server.infrastructure.repositories;

import org.enspy.snappy.server.domain.entities.MessageMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MessageMediaRepository extends JpaRepository<MessageMedia, UUID> {
}
