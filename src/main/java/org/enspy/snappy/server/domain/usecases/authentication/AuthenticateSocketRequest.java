package org.enspy.snappy.server.domain.usecases.authentication;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.user.GetUserFromExternalIdAndProjectIdDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class AuthenticateSocketRequest implements UseCase<GetUserFromExternalIdAndProjectIdDto, Optional<User>> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<User> execute(GetUserFromExternalIdAndProjectIdDto dto) {
        return userRepository.findByExternalIdAndProjectId(dto.getUserExternalId(), dto.getProjectId());
    }
}
