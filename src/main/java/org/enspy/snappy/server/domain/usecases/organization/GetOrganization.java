package org.enspy.snappy.server.domain.usecases.organization;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.usecases.UseCase;

public class GetOrganization implements UseCase<String, Organization> {
    @Override
    public Organization execute(String organizationId) {
        return null;
    }
}
