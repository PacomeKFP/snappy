package org.enspy.snappy.server.domain.usecases.signal;

import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
import org.enspy.snappy.server.domain.model.PreKeyBundle;
import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.storages.PreKeyBundleStorage;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class GetPreKeyBundleUseCase implements MonoUseCase<String, PreKeyBundle> {

  private final PreKeyBundleStorage preKeyBundleStorage;

  public GetPreKeyBundleUseCase(PreKeyBundleStorage preKeyBundleStorage) {
    this.preKeyBundleStorage = preKeyBundleStorage;
  }

  @Override
  public Mono<PreKeyBundle> execute(String userId) {
    if (userId == null || userId.isEmpty()) {
      return Mono.error(
          new IllegalArgumentException("L'identifiant utilisateur ne peut pas être vide"));
    }

    return preKeyBundleStorage
        .findByUserId(userId)
        .switchIfEmpty(
            Mono.error(
                new EntityNotFoundException(
                    "PreKeyBundle non trouvé pour l'utilisateur : " + userId)));
  }
}
