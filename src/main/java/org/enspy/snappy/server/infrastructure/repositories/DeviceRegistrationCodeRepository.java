package org.enspy.snappy.server.infrastructure.repositories;

import org.enspy.snappy.server.domain.entities.DeviceRegistrationCode;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.UUID;

public interface DeviceRegistrationCodeRepository extends ReactiveCrudRepository<DeviceRegistrationCode, UUID> {

    Mono<DeviceRegistrationCode> findByCodeAndExpiresAtAfter(String code, LocalDateTime now);

    Flux<DeviceRegistrationCode> findByUserId(String userId);
}
