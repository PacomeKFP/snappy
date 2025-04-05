package inc.yowyob.service.snappy.domain.usecases.user;

import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.UserRepository;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class DeleteUserUseCase implements UseCase<String, Void> {

  private final UserRepository userRepository;

  public DeleteUserUseCase(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

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
