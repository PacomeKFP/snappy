package inc.yowyob.service.snappy.domain.usecases.user;

import inc.yowyob.service.snappy.domain.entities.User;
import inc.yowyob.service.snappy.domain.usecases.FluxUseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.UserRepository;
import inc.yowyob.service.snappy.presentation.dto.user.GetUserContactsDto;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class GetUserContactsUseCase implements FluxUseCase<GetUserContactsDto, User> {

  private final UserRepository userRepository;

  public GetUserContactsUseCase(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public Flux<User> execute(GetUserContactsDto dto) {
    // Validate input data
    if (dto.getUserExternalId() == null || dto.getUserExternalId().isBlank()) {
      return Flux.error(new IllegalArgumentException("User external ID cannot be blank or null."));
    }
    if (dto.getProjectId() == null || dto.getProjectId().isBlank()) {
      return Flux.error(new IllegalArgumentException("Project ID cannot be blank or null."));
    }

    // Find the user by external ID and verify they exist
    return userRepository
        .findByExternalIdAndProjectId(dto.getUserExternalId(), dto.getProjectId())
        .switchIfEmpty(Mono.error(new IllegalArgumentException(
            "User with external ID " + dto.getUserExternalId() + " not found.")))
        .flatMapMany(user -> Flux.empty()); // TODO: Implement contact relationship using separate table/queries
        // For now, return empty list since R2DBC doesn't support complex relationships
        // This would need a separate ContactRepository or user_contacts table
  }
}