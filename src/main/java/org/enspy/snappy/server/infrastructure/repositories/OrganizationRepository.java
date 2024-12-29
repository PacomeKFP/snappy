package org.enspy.snappy.server.infrastructure.repositories;

import org.enspy.snappy.server.domain.entities.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, UUID> {

    Optional<Organization> findByEmail(String email);
    Optional<Organization> findByProjectId(String projectId);

}
