package org.enspy.snappy.server.domain.usecases.signal;

import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
import org.enspy.snappy.server.domain.model.PreKeyBundle;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.storages.PreKeyBundleStorage;
import org.springframework.stereotype.Service;

@Service
public class GetPreKeyBundleUseCase implements UseCase<String, PreKeyBundle> {

  private final PreKeyBundleStorage preKeyBundleStorage;

  public GetPreKeyBundleUseCase(PreKeyBundleStorage preKeyBundleStorage) {
    this.preKeyBundleStorage = preKeyBundleStorage;
  }

  @Override
  public PreKeyBundle execute(String userId) {
    PreKeyBundle bundle = preKeyBundleStorage.findByUserId(userId);
    if (bundle == null) {
      throw new EntityNotFoundException("PreKeyBundle non trouvé pour l'utilisateur : " + userId);
    }
    return bundle;
  }
}
