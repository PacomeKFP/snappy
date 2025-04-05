package inc.yowyob.service.snappy.domain.usecases.user;

import inc.yowyob.service.snappy.domain.entities.User;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.UserRepository;
import inc.yowyob.service.snappy.presentation.dto.user.AddContactDto;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AddContactUseCase implements UseCase<AddContactDto, List<User>> {

  private final UserRepository userRepository;

  public AddContactUseCase(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public List<User> execute(AddContactDto userId) {
    // Validate the requesting user
    User requester =
        userRepository
            .findByExternalIdAndProjectId(userId.getRequesterId(), userId.getProjectId())
            .orElseThrow(() -> new IllegalArgumentException("Requester not found in the project"));

    // Validate the target user
    User targetContact =
        userRepository
            .findByExternalIdAndProjectId(userId.getContactId(), userId.getProjectId())
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
