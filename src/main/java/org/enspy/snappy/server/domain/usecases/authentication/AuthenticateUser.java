package org.enspy.snappy.server.domain.usecases.authentication;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;

public class AuthenticateUser implements UseCase<User, String> {
    @Override
    public String execute(User userId) {
        return "";
    }
}
