package org.enspy.snappy.server.presentation.resources;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.enspy.snappy.server.domain.entities.Organization;

@Data
@NoArgsConstructor
public class AuthenticateOrganizationResource {
    private Organization organization;
    private String token;

    public AuthenticateOrganizationResource(final Organization organization, final String token) {
        this.organization = organization;
        this.token = token;
        this.removeSensitiveInformations();
    }

    public void setOrganization(final Organization organization) {
        this.organization = organization;
        this.removeSensitiveInformations();
    }

    public void removeSensitiveInformations() {
        this.organization.setPassword(null);
        this.organization.setUsers(null);
    }
}
