package org.enspy.snappy.server.domain.usecases.authentication;

import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateUserDto;

public class AuthenticateUserUseCase implements UseCase<AuthenticateUserDto, String> {
    @Override
    //Retour : infos user + token jwt + Role of user + projectID
    public String execute(AuthenticateUserDto userId) {
        return "";
    }
}
