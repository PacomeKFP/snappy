package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class DeleteUser implements UseCase<String, Void> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Void execute(String userId) {
        // Validate input
        UUID userUuid;
        try {
            userUuid = UUID.fromString(userId);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Invalid user ID format.");
        }

        // Check if the user exists
        if (!userRepository.existsById(userUuid)) {
            throw new IllegalArgumentException("User with ID " + userId + " does not exist.");
        }

        // Delete the user
        userRepository.deleteById(userUuid);
        return null;
    }
}