package org.enspy.snappy.server.domain.usecases.user;

import  org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FindAllUsers implements UseCase<String, List<User>> {

    @Autowired
    private UserRepository userRepository;

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