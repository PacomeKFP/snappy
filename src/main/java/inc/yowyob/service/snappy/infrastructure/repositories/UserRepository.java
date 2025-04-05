package inc.yowyob.service.snappy.infrastructure.repositories;

import inc.yowyob.service.snappy.domain.entities.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

  Optional<User> findByExternalIdAndProjectId(String externalId, String projectId);

  Optional<User> findByLoginAndProjectId(String login, String projectId);

  List<User> findByDisplayNameAndProjectId(String displayName, String projectId);
}
