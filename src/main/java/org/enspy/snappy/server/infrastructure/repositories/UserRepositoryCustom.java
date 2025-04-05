package org.enspy.snappy.server.infrastructure.repositories;

import reactor.core.publisher.Mono;
import java.util.UUID;

public interface UserRepositoryCustom {
    Mono<Boolean> existsContactRelation(UUID userId, UUID contactId);
    Mono<Void> addContactRelation(UUID userId, UUID contactId);
}