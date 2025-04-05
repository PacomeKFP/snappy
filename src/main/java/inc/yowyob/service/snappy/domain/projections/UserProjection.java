package inc.yowyob.service.snappy.domain.projections;

import inc.yowyob.service.snappy.domain.entities.User;
import lombok.Data;

@Data
public class UserProjection {
  private final String externalId;

  public UserProjection(User user) {
    this.externalId = user.getExternalId(); // Assurez-vous que `externalId` existe dans `User`
  }
}
