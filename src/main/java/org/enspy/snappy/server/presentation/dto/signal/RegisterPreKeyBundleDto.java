package org.enspy.snappy.server.presentation.dto.signal;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.enspy.snappy.server.domain.model.PreKeyBundle;

@Data
@AllArgsConstructor
public class RegisterPreKeyBundleDto {
  private final String userId;
  private final PreKeyBundle preKeyBundle;
}
