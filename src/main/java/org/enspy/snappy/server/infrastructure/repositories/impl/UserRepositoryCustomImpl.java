package org.enspy.snappy.server.infrastructure.repositories.impl;

import org.enspy.snappy.server.infrastructure.repositories.UserRepositoryCustom;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Repository
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    private final DatabaseClient databaseClient;

    public UserRepositoryCustomImpl(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    @Override
    public Mono<Boolean> existsContactRelation(UUID userId, UUID contactId) {
        return databaseClient.sql(
                "SELECT COUNT(*) FROM user_contacts WHERE user_id = :userId AND contact_id = :contactId")
                .bind("userId", userId)
                .bind("contactId", contactId)
                .map(row -> row.get(0, Integer.class) > 0)
                .one();
    }

    @Override
    public Mono<Void> addContactRelation(UUID userId, UUID contactId) {
        return databaseClient.sql(
                "INSERT INTO user_contacts (user_id, contact_id) VALUES (:userId, :contactId)")
                .bind("userId", userId)
                .bind("contactId", contactId)
                .fetch()
                .rowsUpdated()
                .then();
    }
}