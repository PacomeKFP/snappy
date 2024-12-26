package org.enspy.snappy.server.domain.usecases.organization;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.usecases.UseCase;

public class DeleteOrganization implements UseCase<String, Void> {
    @Override
    public Void execute(String organizationId) {
        return null;
    }
}
