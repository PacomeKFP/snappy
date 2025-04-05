package inc.yowyob.service.snappy.presentation.dto.signal;

import inc.yowyob.service.snappy.domain.model.PreKeyBundle;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterPreKeyBundleDto {
  private final String userId;
  private final PreKeyBundle preKeyBundle;
}
