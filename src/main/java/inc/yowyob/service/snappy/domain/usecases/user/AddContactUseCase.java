package inc.yowyob.service.snappy.domain.usecases.user;

import inc.yowyob.service.snappy.domain.entities.User;
import inc.yowyob.service.snappy.domain.usecases.FluxUseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.UserRepository;
import inc.yowyob.service.snappy.presentation.dto.user.AddContactDto;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class AddContactUseCase implements FluxUseCase<AddContactDto, User> {

  private final UserRepository userRepository;

  public AddContactUseCase(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public Flux<User> execute(AddContactDto dto) {
    // Validate the requesting user
    return userRepository
        .findByExternalIdAndProjectId(dto.getRequesterId(), dto.getProjectId())
        .switchIfEmpty(Mono.error(new IllegalArgumentException("Requester not found in the project")))
        .then(userRepository
            .findByExternalIdAndProjectId(dto.getContactId(), dto.getProjectId())
            .switchIfEmpty(Mono.error(new IllegalArgumentException("Contact not found in the project"))))
        .flatMapMany(targetContact -> {
            // TODO: Implement contact relationship using separate table/queries
            // For now, return empty list since R2DBC doesn't support complex relationships
            // This would need a separate ContactRepository or user_contacts table
            return Flux.empty();
        });
  }
}