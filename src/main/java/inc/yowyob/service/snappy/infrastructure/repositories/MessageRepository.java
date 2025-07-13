package inc.yowyob.service.snappy.infrastructure.repositories;

import inc.yowyob.service.snappy.domain.entities.Message;
import java.util.List;
import java.util.UUID;

import inc.yowyob.service.snappy.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {

  @Query("SELECT m FROM Message m WHERE " +
          "m.projectId = :projectId AND " +
          "((m.sender = :user1 AND m.receiver = :user2) OR " +
          " (m.sender = :user2 AND m.receiver = :user1))")
  List<Message> findConversationBetweenTwoUsersInProject(
          String projectId,
          User user1, User user2);

  // Find all messages where the user is either the sender or receiver
  List<Message> findBySenderIdOrReceiverId(UUID senderId, UUID receiverId);
}
