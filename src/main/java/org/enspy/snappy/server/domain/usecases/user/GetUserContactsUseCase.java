package org.enspy.snappy.server.domain.usecases.user;

import java.util.List;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.user.GetUserContactsDto;
import org.springframework.stereotype.Component;

@Component
public class GetUserContactsUseCase implements UseCase<GetUserContactsDto, List<User>> {

    private final UserRepository userRepository;

    public GetUserContactsUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> execute(GetUserContactsDto dto) {
        // Validate input data
        if (dto.getUserExternalId() == null || dto.getUserExternalId().isBlank()) {
            throw new IllegalArgumentException("User external ID cannot be blank or null.");
        }
        if (dto.getProjectId() == null || dto.getProjectId().isBlank()) {
            throw new IllegalArgumentException("Project ID cannot be blank or null.");
        }

        // Find the user by external ID
        User user = userRepository.findByExternalIdAndProjectId(dto.getUserExternalId(), dto.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "User with external ID " + dto.getUserExternalId() + " not found.")
                );

        // Fetch contacts (logic assumes a relation for contacts exists in User entity)
        return user.getContacts();
    }
}