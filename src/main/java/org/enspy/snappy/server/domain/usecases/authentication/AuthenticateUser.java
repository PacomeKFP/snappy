package org.enspy.snappy.server.domain.usecases.authentication;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateUserDto;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;

public class AuthenticateUser implements UseCase<AuthenticateUserDto, String> {
    @Override
    public String execute(AuthenticateUserDto userId) {
        return "";
    }
}
