package inc.yowyob.service.snappy.infrastructure.repositories;

import inc.yowyob.service.snappy.domain.entities.Message;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {

  // Custom query to fetch messages between two users
  List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
      UUID senderId1, UUID receiverId1, UUID senderId2, UUID receiverId2);

  // Find all messages where the user is either the sender or receiver
  List<Message> findBySenderIdOrReceiverId(UUID senderId, UUID receiverId);
}
