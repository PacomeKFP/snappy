package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.exceptions.ProjectNotFoundException;
import org.enspy.snappy.server.domain.exceptions.UserAlreadyExistsException;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;
import org.enspy.snappy.server.presentation.dto.user.CreateUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CreateUserUseCase implements UseCase<CreateUserDto, User> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationRepository organizationRepository; // To verify projectId and fetch organization.

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // For hashing secrets.

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public User execute(CreateUserDto dto) {
        // Basic input validation
        validateInput(dto);

        // Verify projectId and get organization
        Organization organization = organizationRepository.findByProjectId(dto.getProjectId())
                .orElseThrow(() -> new ProjectNotFoundException("Project with ID '" + dto.getProjectId() + "' not found."));

        // Check for existing user
        Optional<User> existingUser = userRepository.findByExternalIdAndProjectId(dto.getExternalId(), dto.getProjectId());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("User with external ID '" + dto.getExternalId() + "' already exists.");
        }

        // Build the new User object
        User newUser = new User();
//        newUser.setId(UUID.randomUUID());
        newUser.setAvatar(dto.getAvatar());
        newUser.setDisplayName(dto.getDisplayName());
        newUser.setEmail(dto.getEmail());
        newUser.setPhoneNumber(dto.getPhoneNumber());
        newUser.setExternalId(dto.getExternalId());
        newUser.setLogin(dto.getLogin());
        newUser.setSecret(passwordEncoder.encode(dto.getSecret()));
        newUser.setCustomJson(dto.getCustomJson());
        newUser.setProjectId(dto.getProjectId());
        newUser.setOrganization(organization);  // This is crucial - set the organization before saving


        return userRepository.save(newUser);
    }

    /**
     * Validate the input data in the DTO to ensure required fields are not null or invalid.
     */
    private void validateInput(CreateUserDto dto) {
        if (dto.getExternalId() == null || dto.getExternalId().isEmpty()) {
            throw new IllegalArgumentException("ExternalId is required.");
        }

        if (dto.getDisplayName() == null || dto.getDisplayName().isEmpty()) {
            throw new IllegalArgumentException("DisplayName is required.");
        }

        if (dto.getLogin() == null || dto.getLogin().isEmpty()) {
            throw new IllegalArgumentException("Login is required.");
        }

        if (dto.getSecret() == null || dto.getSecret().isEmpty()) {
            throw new IllegalArgumentException("Secret is required.");
        }

        if (dto.getProjectId() == null || dto.getProjectId().isEmpty()) {
            throw new IllegalArgumentException("ProjectId is required.");
        }

        if (dto.getEmail() != null && !dto.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$")) {
            throw new IllegalArgumentException("Invalid email format.");
        }

        if (dto.getPhoneNumber() != null && !dto.getPhoneNumber().matches("^\\+?[1-9][0-9]{1,14}$")) {
            throw new IllegalArgumentException("Invalid phone number format.");
        }
    }
}