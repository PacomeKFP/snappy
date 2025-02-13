package org.enspy.snappy.server.domain.usecases.user;

import java.util.List;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class FindAllUsersUseCase implements UseCase<String, List<User>> {

    private final UserRepository userRepository;

    public FindAllUsersUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> execute(String projectId) {
        // Validate projectId
        if (projectId == null || projectId.isEmpty()) {
            throw new IllegalArgumentException("Project ID cannot be null or empty.");
        }

        // Fetch all users (logic assumes we have a field projectId in the User entity)
        // Adjust the query method as needed to filter by projectId


        return userRepository.findAll();
    }
}