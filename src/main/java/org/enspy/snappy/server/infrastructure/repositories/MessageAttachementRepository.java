package org.enspy.snappy.server.infrastructure.repositories;

import java.util.UUID;
import org.enspy.snappy.server.domain.entities.MessageAttachement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageAttachementRepository extends JpaRepository<MessageAttachement, UUID> {
}
