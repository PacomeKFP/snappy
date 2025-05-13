package org.enspy.snappy.server.presentation.controllers;

import org.enspy.snappy.server.application.services.DeviceService;
import org.enspy.snappy.server.domain.entities.Device;
import org.enspy.snappy.server.presentation.dto.DeviceRegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/devices")
public class DeviceController {
    
    @Autowired
    private DeviceService deviceService;
    
    @PostMapping("/register")
    public Mono<ResponseEntity<Device>> registerDevice(
            @RequestBody DeviceRegistrationRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return deviceService.registerDevice(userDetails.getUsername(), request)
            .map(device -> ResponseEntity.ok(device));
    }
    
    @GetMapping
    public Mono<ResponseEntity<Flux<Device>>> getUserDevices(@AuthenticationPrincipal UserDetails userDetails) {
        return Mono.just(ResponseEntity.ok(deviceService.getUserDevices(userDetails.getUsername())));
    }
    
    @DeleteMapping("/{deviceId}")
    public Mono<ResponseEntity<Void>> removeDevice(
            @PathVariable String deviceId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return deviceService.removeDevice(userDetails.getUsername(), deviceId)
            .then(Mono.just(ResponseEntity.ok().build()));
    }
}