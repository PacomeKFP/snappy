package org.enspy.snappy.repositories;

import org.enspy.snappy.models.Conversation;
import org.enspy.snappy.models.Message;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends CassandraRepository<Message, UUID> {

    @Query("SELECT * FROM messages WHERE conversation_uuid = ?0 AND message_uuid < ?1 LIMIT ?2")
    List<Message> findMessagesForConversation(UUID conversationUuid, UUID messageUuid, int limit);

    @Query("SELECT * FROM messages WHERE conversation_uuid = ?0 AND isRead = false")
    List<Message> findUnreadMessages(UUID conversationUuid);
}
