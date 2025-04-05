package org.enspy.snappy.server.domain.usecases.signal;

import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.storages.PreKeyBundleStorage;
import org.enspy.snappy.server.presentation.dto.signal.RegisterPreKeyBundleDto;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class RegisterPreKeyBundleUseCase implements MonoUseCase<RegisterPreKeyBundleDto, Void> {

  private final PreKeyBundleStorage preKeyBundleStorage;

  public RegisterPreKeyBundleUseCase(PreKeyBundleStorage preKeyBundleStorage) {
    this.preKeyBundleStorage = preKeyBundleStorage;
  }

  @Override
  public Mono<Void> execute(RegisterPreKeyBundleDto registerPreKeyBundleDto) {
    if (registerPreKeyBundleDto == null
        || registerPreKeyBundleDto.getUserId() == null
        || registerPreKeyBundleDto.getPreKeyBundle() == null) {
      return Mono.error(
          new IllegalArgumentException("Les données d'enregistrement ne peuvent pas être nulles"));
    }

    return preKeyBundleStorage.save(
        registerPreKeyBundleDto.getUserId(), registerPreKeyBundleDto.getPreKeyBundle());
  }
}
