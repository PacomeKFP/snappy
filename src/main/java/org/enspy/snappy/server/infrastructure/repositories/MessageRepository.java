package org.enspy.snappy.server.infrastructure.repositories;

import org.enspy.snappy.server.domain.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {

    // Custom query to fetch messages between two users
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(UUID senderId1, UUID receiverId1, UUID senderId2, UUID receiverId2);

    // Find all messages where the user is either the sender or receiver
    List<Message> findBySenderIdOrReceiverId(UUID senderId, UUID receiverId);
}