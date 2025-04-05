package inc.yowyob.service.snappy.domain.usecases.signal;

import inc.yowyob.service.snappy.domain.exceptions.EntityNotFoundException;
import inc.yowyob.service.snappy.domain.model.PreKeyBundle;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.storages.PreKeyBundleStorage;
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
