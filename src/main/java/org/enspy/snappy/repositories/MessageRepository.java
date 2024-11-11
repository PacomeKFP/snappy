package org.enspy.snappy.repositories;

import org.enspy.snappy.models.Message;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MessageRepository extends CassandraRepository<Message, UUID> {

    @Query("SELECT * FROM message WHERE conversation = ?0 AND uuid < ?1 LIMIT ?2 ALLOW FILTERING")
    List<Message> findMessagesForConversation(UUID conversationUuid, UUID messageUuid, int limit);

    @Query("SELECT * FROM message WHERE conversation = ?0  AND isRead = false ALLOW FILTERING")
    List<Message> findUnreadMessages(UUID conversationUuid);

    @Query("UPDATE message SET isRead = true WHERE uuid = ?0 IF EXISTS")
    Optional<Message> markMessageAsRead(UUID uuid);
}

