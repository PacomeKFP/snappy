package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.user.FindUserByDisplayNameDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FindUserByDisplayNameUseCase implements UseCase<FindUserByDisplayNameDto, List<User>> {

    private final UserRepository userRepository;

    public FindUserByDisplayNameUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> execute(FindUserByDisplayNameDto dto) {
        return userRepository.findByDisplayNameAndProjectId(dto.getDisplayName(), dto.getProjectId());
    }
}
