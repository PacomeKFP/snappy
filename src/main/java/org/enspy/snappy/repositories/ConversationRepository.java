package org.enspy.snappy.repositories;

import jakarta.validation.constraints.NotNull;
import org.enspy.snappy.models.Conversation;
import org.enspy.snappy.models.User;
import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConversationRepository extends CassandraRepository<Conversation, UUID> {
    @AllowFiltering
    List<Conversation> findByUsersContaining(UUID userUuid);
    Optional<Conversation> findById(@NotNull  UUID uuid);


    @Query("UPDATE conversation SET states[?1] = ?2 WHERE uuid = ?0 IF EXISTS")
    void changeState(UUID conversationId, UUID user, Integer state);
}
