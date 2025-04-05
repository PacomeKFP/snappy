package org.enspy.snappy.server.infrastructure.repositories;

import java.util.UUID;
import org.enspy.snappy.server.domain.entities.Organization;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface OrganizationRepository extends R2dbcRepository<Organization, UUID> {
  Mono<Boolean> existsByEmail(String email);

  Mono<Organization> findByEmail(String email);

  Mono<Organization> findByProjectId(String projectId);
}
