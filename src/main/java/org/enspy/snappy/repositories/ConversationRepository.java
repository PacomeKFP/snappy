package org.enspy.snappy.repositories;

import org.enspy.snappy.models.Conversation;
import org.enspy.snappy.models.User;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ConversationRepository extends CassandraRepository<Conversation, UUID> {
    List<Conversation> findByUsersContaining(UUID userUuid);
}
