package org.enspy.snappy.server.infrastructure.repositories;

import org.enspy.snappy.server.domain.entities.Attachement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AttachementRepository extends JpaRepository<Attachement, UUID> {
}
