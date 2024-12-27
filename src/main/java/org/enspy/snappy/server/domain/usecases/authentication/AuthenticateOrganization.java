package org.enspy.snappy.server.domain.usecases.authentication;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;

public class AuthenticateOrganization implements UseCase<Organization, String> {
    @Override
    public String execute(Organization userId) {
        return "";
    }
}
