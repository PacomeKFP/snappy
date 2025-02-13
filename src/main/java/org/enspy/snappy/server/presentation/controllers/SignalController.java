package org.enspy.snappy.server.presentation.controllers;

import lombok.RequiredArgsConstructor;
import org.enspy.snappy.server.domain.model.PreKeyBundle;
import org.enspy.snappy.server.domain.usecases.signal.GetPreKeyBundleUseCase;
import org.enspy.snappy.server.domain.usecases.signal.RegisterPreKeyBundleUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signal")
@RequiredArgsConstructor
public class SignalController {

    private final RegisterPreKeyBundleUseCase registerPreKeyBundleUseCase;
    private final GetPreKeyBundleUseCase getPreKeyBundleUseCase;

    @PostMapping("/pre-key-bundle/{userId}")
    public ResponseEntity<Void> registerPreKeyBundle(
            @PathVariable String userId,
            @RequestBody PreKeyBundle preKeyBundle) {
        RegisterPreKeyBundleUseCase.Input input = new RegisterPreKeyBundleUseCase.Input(userId, preKeyBundle);
        registerPreKeyBundleUseCase.execute(input);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/pre-key-bundle/{userId}")
    public ResponseEntity<PreKeyBundle> getPreKeyBundle(@PathVariable String userId) {
        PreKeyBundle bundle = getPreKeyBundleUseCase.execute(userId);
        return ResponseEntity.ok(bundle);
    }
}
