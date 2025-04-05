package inc.yowyob.service.snappy.infrastructure.repositories;

import inc.yowyob.service.snappy.domain.entities.Organization;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, UUID> {

  Optional<Organization> findByEmail(String email);

  Optional<Organization> findByProjectId(String projectId);
}
