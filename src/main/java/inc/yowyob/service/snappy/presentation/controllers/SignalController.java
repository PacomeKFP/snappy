package inc.yowyob.service.snappy.presentation.controllers;

import inc.yowyob.service.snappy.domain.model.PreKeyBundle;
import inc.yowyob.service.snappy.domain.usecases.signal.GetPreKeyBundleUseCase;
import inc.yowyob.service.snappy.domain.usecases.signal.RegisterPreKeyBundleUseCase;
import inc.yowyob.service.snappy.presentation.dto.signal.RegisterPreKeyBundleDto;
import lombok.RequiredArgsConstructor;
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
      @PathVariable String userId, @RequestBody PreKeyBundle preKeyBundle) {
    RegisterPreKeyBundleDto registerPreKeyBundleDto =
        new RegisterPreKeyBundleDto(userId, preKeyBundle);
    registerPreKeyBundleUseCase.execute(registerPreKeyBundleDto);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/pre-key-bundle/{userId}")
  public ResponseEntity<PreKeyBundle> getPreKeyBundle(@PathVariable String userId) {
    PreKeyBundle bundle = getPreKeyBundleUseCase.execute(userId);
    return ResponseEntity.ok(bundle);
  }
}
