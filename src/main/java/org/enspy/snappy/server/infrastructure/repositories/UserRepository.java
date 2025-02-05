package org.enspy.snappy.server.infrastructure.repositories;

import org.enspy.snappy.server.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

  Optional<User> findByExternalIdAndProjectId(String externalId, String projectId);

  Optional<User> findByLoginAndProjectId(String login, String projectId);

  List<User> findByDisplayNameAndProjectId(String displayName, String projectId);
}
