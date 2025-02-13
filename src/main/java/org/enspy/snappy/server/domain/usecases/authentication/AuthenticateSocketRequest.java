package org.enspy.snappy.server.domain.usecases.authentication;

import com.corundumstudio.socketio.HandshakeData;
import java.util.Optional;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.exceptions.AuthenticationFailedException;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.services.JwtService;
import org.springframework.stereotype.Component;

@Component
public class AuthenticateSocketRequest implements UseCase<HandshakeData, User> {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthenticateSocketRequest(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }


    @Override
    public User execute(HandshakeData handshakeData) {
        String userExternalId = handshakeData.getSingleUrlParam("user");
        String projectId = handshakeData.getSingleUrlParam("projectId");

        // extraire les claims du token jwt, et retourner les infos de l'user

        Optional<User> user = userRepository.findByExternalIdAndProjectId(userExternalId, projectId);

        if (user.isEmpty())
            throw new AuthenticationFailedException("The user not found");

        return user.get();
    }
}
