package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.usecases.UseCase;

public class CreateUser implements UseCase<Organization , Organization> {
    @Override
    public Organization execute(Organization dto) {
        return null;
    }
}
