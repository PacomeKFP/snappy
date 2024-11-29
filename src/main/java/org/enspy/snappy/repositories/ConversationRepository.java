package org.enspy.snappy.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.enspy.snappy.models.Conversation;
import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.validation.constraints.NotNull;

@Repository
public interface ConversationRepository extends CassandraRepository<Conversation, UUID> {
    @AllowFiltering
    List<Conversation> findByUsersContaining(UUID userUuid);
    Optional<Conversation> findById(@NotNull  UUID uuid);


    @Query("UPDATE conversation SET states[?1] = ?2 WHERE uuid = ?0 IF EXISTS")
    void changeState(UUID conversationId, UUID user, Integer state);
}
