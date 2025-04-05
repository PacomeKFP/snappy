package inc.yowyob.service.snappy.infrastructure.repositories;

import inc.yowyob.service.snappy.domain.entities.Chatbot;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatbotRepository extends JpaRepository<Chatbot, UUID> {
  List<Chatbot> findChatbotByProjectId(String projectId);
}
