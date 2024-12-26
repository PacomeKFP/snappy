package org.enspy.snappy.server.domain.usecases.authentication;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;

public class AuthenticateUser implements UseCase<User, String> {
    @Override
    public String execute(User dto) {
        return "";
    }
}
