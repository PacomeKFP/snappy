package org.enspy.snappy.server.domain.usecases.authentication;

import com.corundumstudio.socketio.HandshakeData;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.exceptions.AuthenticationFailedException;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class AuthenticateSocketRequest implements UseCase<HandshakeData, User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User execute(HandshakeData handshakeData) {
        String userExternalId = handshakeData.getSingleUrlParam("user");
        String projectId = handshakeData.getSingleUrlParam("projectId");


        Optional<User> user = userRepository.findByExternalIdAndProjectId(userExternalId, projectId);

        if (user.isEmpty())
            throw new AuthenticationFailedException("The user not found");

        return user.get();
    }
}
