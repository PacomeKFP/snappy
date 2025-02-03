package org.enspy.snappy.server.domain.projections;

import lombok.Data;
import org.enspy.snappy.server.domain.entities.User;

@Data
public class UserProjection {
    private final String externalId;

    public UserProjection(User user) {
        this.externalId = user.getExternalId(); // Assurez-vous que `externalId` existe dans `User`
    }
}
