package inc.yowyob.service.snappy.domain.usecases.signal;

import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.storages.PreKeyBundleStorage;
import inc.yowyob.service.snappy.presentation.dto.signal.RegisterPreKeyBundleDto;
import org.springframework.stereotype.Service;

@Service
public class RegisterPreKeyBundleUseCase implements UseCase<RegisterPreKeyBundleDto, Void> {

  private final PreKeyBundleStorage preKeyBundleStorage;

  public RegisterPreKeyBundleUseCase(PreKeyBundleStorage preKeyBundleStorage) {
    this.preKeyBundleStorage = preKeyBundleStorage;
  }

  @Override
  public Void execute(RegisterPreKeyBundleDto registerPreKeyBundleDto) {
    if (registerPreKeyBundleDto == null
        || registerPreKeyBundleDto.getUserId() == null
        || registerPreKeyBundleDto.getPreKeyBundle() == null) {
      throw new IllegalArgumentException("Les données d'enregistrement ne peuvent pas être nulles");
    }
    preKeyBundleStorage.save(
        registerPreKeyBundleDto.getUserId(), registerPreKeyBundleDto.getPreKeyBundle());
    return null;
  }
}
