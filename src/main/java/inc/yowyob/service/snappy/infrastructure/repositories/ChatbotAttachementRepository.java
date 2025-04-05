package inc.yowyob.service.snappy.infrastructure.repositories;

import inc.yowyob.service.snappy.domain.entities.ChatbotAttachement;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatbotAttachementRepository extends JpaRepository<ChatbotAttachement, UUID> {}
