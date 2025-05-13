package org.enspy.snappy.server.infrastructure.services;

import org.enspy.snappy.server.domain.entities.Device;
import org.enspy.snappy.server.domain.entities.DeviceType;
import org.enspy.snappy.server.domain.repositories.DeviceRepository;
import org.enspy.snappy.server.presentation.dto.DeviceRegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class DeviceService {
    
    @Autowired
    private DeviceRepository deviceRepository;
    
    public Mono<Device> registerDevice(String userId, DeviceRegistrationRequest request) {
        return deviceRepository.findByDeviceId(request.getDeviceId())
            .flatMap(existingDevice -> {
                // Mise à jour de l'appareil existant
                existingDevice.setLastActive(LocalDateTime.now());
                existingDevice.setDeviceName(request.getDeviceName());
                if (request.getFcmToken() != null) {
                    existingDevice.setFcmToken(request.getFcmToken());
                }
                return deviceRepository.save(existingDevice);
            })
            .switchIfEmpty(Mono.defer(() -> {
                // Création d'un nouvel appareil
                Device newDevice = new Device();
                newDevice.setId(UUID.randomUUID());
                newDevice.setUserId(userId);
                newDevice.setDeviceId(request.getDeviceId());
                newDevice.setDeviceType(DeviceType.valueOf(request.getDeviceType()));
                newDevice.setDeviceName(request.getDeviceName());
                newDevice.setLastActive(LocalDateTime.now());
                newDevice.setFcmToken(request.getFcmToken());
                newDevice.setCreatedAt(LocalDateTime.now());
                newDevice.setUpdatedAt(LocalDateTime.now());
                return deviceRepository.save(newDevice);
            }));
    }
    
    public Flux<Device> getUserDevices(String userId) {
        return deviceRepository.findByUserId(userId);
    }
    
    public Mono<Void> removeDevice(String userId, String deviceId) {
        return deviceRepository.findByDeviceId(deviceId)
            .filter(device -> device.getUserId().equals(userId))
            .flatMap(device -> deviceRepository.delete(device));
    }
    
    public Mono<Device> updateDeviceLastActive(String deviceId) {
        return deviceRepository.findByDeviceId(deviceId)
            .flatMap(device -> {
                device.setLastActive(LocalDateTime.now());
                device.setUpdatedAt(LocalDateTime.now());
                return deviceRepository.save(device);
            });
    }
}