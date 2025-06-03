
package org.enspy.snappy.server.infrastructure.repositories;


import org.enspy.snappy.server.domain.entities.Device;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Repository
public interface DeviceRepository extends ReactiveCrudRepository<Device, UUID> {
    Flux<Device> findByUserId(String userId);
    Mono<Device> findByDeviceId(String deviceId);
    Mono<Device> findByUserIdAndDeviceId(String userId, String deviceId);
    Mono<Void> deleteByDeviceId(String deviceId);
}