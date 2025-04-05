package org.enspy.snappy.server.infrastructure.repositories;

import java.util.UUID;
import org.enspy.snappy.server.domain.entities.User;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends R2dbcRepository<User, UUID>, UserRepositoryCustom {
  Mono<User> findByExternalIdAndProjectId(String externalId, String projectId);

  Mono<User> findByLoginAndProjectId(String login, String projectId);

  Flux<User> findByDisplayNameLikeAndProjectId(String displayName, String projectId);

  @Query("DELETE FROM users WHERE organization_id = :organizationId")
  Flux<Void> deleteAllByOrganizationId(UUID organizationId);

  Flux<User> findByProjectId(String projectId);
}
