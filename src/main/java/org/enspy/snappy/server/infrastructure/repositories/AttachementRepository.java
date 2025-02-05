package org.enspy.snappy.server.infrastructure.repositories;

import java.util.UUID;
import org.enspy.snappy.server.domain.entities.Attachement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttachementRepository extends JpaRepository<Attachement, UUID> {
}
