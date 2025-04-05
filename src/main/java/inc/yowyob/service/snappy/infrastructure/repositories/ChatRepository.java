package inc.yowyob.service.snappy.infrastructure.repositories;

import inc.yowyob.service.snappy.domain.entities.Chat;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, UUID> {

  Optional<Chat> findByProjectIdAndReceiverAndSender(
      String projectId, String receiver, String sender);
}
