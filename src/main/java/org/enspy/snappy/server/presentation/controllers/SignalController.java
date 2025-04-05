package org.enspy.snappy.server.presentation.controllers;

import lombok.RequiredArgsConstructor;
import org.enspy.snappy.server.domain.model.PreKeyBundle;
import org.enspy.snappy.server.domain.usecases.signal.GetPreKeyBundleUseCase;
import org.enspy.snappy.server.domain.usecases.signal.RegisterPreKeyBundleUseCase;
import org.enspy.snappy.server.presentation.dto.signal.RegisterPreKeyBundleDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/signal")
@RequiredArgsConstructor
public class SignalController {

  private final RegisterPreKeyBundleUseCase registerPreKeyBundleUseCase;
  private final GetPreKeyBundleUseCase getPreKeyBundleUseCase;

  @PostMapping("/pre-key-bundle/{userId}")
  public Mono<ResponseEntity<Void>> registerPreKeyBundle(
      @PathVariable String userId, @RequestBody PreKeyBundle preKeyBundle) {
    RegisterPreKeyBundleDto dto = new RegisterPreKeyBundleDto(userId, preKeyBundle);
    return registerPreKeyBundleUseCase.execute(dto)
             .thenReturn(ResponseEntity.ok().build());
  }

  @GetMapping("/pre-key-bundle/{userId}")
  public Mono<ResponseEntity<PreKeyBundle>> getPreKeyBundle(@PathVariable String userId) {
    return getPreKeyBundleUseCase.execute(userId)
             .map(ResponseEntity::ok);
  }
}
