package org.enspy.snappy.server.infrastructure.services;

import org.enspy.snappy.server.domain.entities.Device;
import org.enspy.snappy.server.domain.entities.DeviceRegistrationCode;
import org.enspy.snappy.server.domain.entities.DeviceType;
import org.enspy.snappy.server.domain.exceptions.AuthenticationFailedException;
import org.enspy.snappy.server.infrastructure.repositories.DeviceRegistrationCodeRepository;
import org.enspy.snappy.server.infrastructure.repositories.DeviceRepository;
import org.enspy.snappy.server.presentation.dto.DeviceRegistrationRequest;
import org.enspy.snappy.server.presentation.dto.device.DeviceKeyInfo; // Added
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

    @Autowired
    private DeviceRegistrationCodeRepository deviceRegistrationCodeRepository;
    
    public Mono<Device> registerDevice(String authenticatedUserId, DeviceRegistrationRequest request) {
        return deviceRegistrationCodeRepository.findByCodeAndExpiresAtAfter(request.getTemporaryCode(), LocalDateTime.now())
            .switchIfEmpty(Mono.error(new AuthenticationFailedException("Invalid or expired registration code.")))
            .flatMap(retrievedCode -> {
                if (!retrievedCode.getUserId().equals(authenticatedUserId)) {
                    return Mono.error(new AuthenticationFailedException("Registration code does not match authenticated user."));
                }

                // Use userId from the validated code for device operations
                String deviceUserId = retrievedCode.getUserId();

                Mono<Device> deviceMono = deviceRepository.findByDeviceId(request.getDeviceId())
                    .flatMap(existingDevice -> {
                        // Update existing device
                        existingDevice.setLastActive(LocalDateTime.now());
                        existingDevice.setDeviceName(request.getDeviceName());
                        if (request.getFcmToken() != null) {
                            existingDevice.setFcmToken(request.getFcmToken());
                        }
                        existingDevice.setDevicePublicKey(request.getDevicePublicKey());
                        existingDevice.setKeyAlgorithm(request.getKeyAlgorithm());
                        // Ensure userId is consistent if it's an existing device, though it should be if deviceId is unique
                        existingDevice.setUserId(deviceUserId);
                        existingDevice.setUpdatedAt(LocalDateTime.now());
                        return deviceRepository.save(existingDevice);
                    })
                    .switchIfEmpty(Mono.defer(() -> {
                        // Create new device
                        Device newDevice = new Device();
                        newDevice.setId(UUID.randomUUID());
                        newDevice.setUserId(deviceUserId); // Use userId from validated code
                        newDevice.setDeviceId(request.getDeviceId());
                        newDevice.setDeviceType(DeviceType.valueOf(request.getDeviceType()));
                        newDevice.setDeviceName(request.getDeviceName());
                        newDevice.setLastActive(LocalDateTime.now());
                        newDevice.setFcmToken(request.getFcmToken());
                        newDevice.setDevicePublicKey(request.getDevicePublicKey());
                        newDevice.setKeyAlgorithm(request.getKeyAlgorithm());
                        newDevice.setCreatedAt(LocalDateTime.now());
                        newDevice.setUpdatedAt(LocalDateTime.now());
                        return deviceRepository.save(newDevice);
                    }));

                return deviceMono.flatMap(savedDevice ->
                    deviceRegistrationCodeRepository.delete(retrievedCode).thenReturn(savedDevice)
                );
            });
    }
    
    public Flux<Device> getUserDevices(String userId) {
        return deviceRepository.findByUserId(userId);
    }

    public Flux<DeviceKeyInfo> getUserDeviceKeys(String userId) {
        return deviceRepository.findByUserId(userId)
            .map(device -> new DeviceKeyInfo(
                device.getDeviceId(),
                device.getDeviceName(),
                device.getDeviceType() != null ? device.getDeviceType().name() : null, // Handle potential null deviceType
                device.getDevicePublicKey(),
                device.getKeyAlgorithm(),
                device.getLastActive()
            ));
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

    public Mono<DeviceRegistrationCode> generateRegistrationCode(String userId) {
        String code = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 8); // Generate an 8-character code
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(10); // Expires in 10 minutes

        DeviceRegistrationCode registrationCode = new DeviceRegistrationCode();
        registrationCode.setId(UUID.randomUUID());
        registrationCode.setUserId(userId);
        registrationCode.setCode(code);
        registrationCode.setExpiresAt(expiresAt);
        registrationCode.setCreatedAt(LocalDateTime.now());

        return deviceRegistrationCodeRepository.save(registrationCode);
    }
}