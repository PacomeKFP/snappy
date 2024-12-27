package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;
import org.enspy.snappy.server.presentation.dto.user.AddContactDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddContactUseCase implements UseCase<AddContactDto, List<User>> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> execute(AddContactDto userId) {
        // Validate the requesting user
        User requester = userRepository.findByExternalIdAndProjectId(userId.getRequesterId(), userId.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("Requester not found in the project"));

        // Validate the target user
        User targetContact = userRepository.findByExternalIdAndProjectId(userId.getContactId(), userId.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("Contact not found in the project"));

        // Ensure the contact isn't already in the user's contacts
        if (requester.getContacts().contains(targetContact)) {
            throw new IllegalArgumentException("User is already a contact");
        }

        // Add the contact to the requester's contact list
        requester.getContacts().add(targetContact);

        // Persist the relationship
        userRepository.save(requester);

        // Return the updated list of contacts
        return requester.getContacts();
    }
}