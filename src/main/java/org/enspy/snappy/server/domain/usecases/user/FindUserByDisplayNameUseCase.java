package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.FluxUseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.user.FindUserByDisplayNameDto;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class FindUserByDisplayNameUseCase implements FluxUseCase<FindUserByDisplayNameDto, User> {

  private final UserRepository userRepository;

  public FindUserByDisplayNameUseCase(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public Flux<User> execute(FindUserByDisplayNameDto dto) {
    // Validation réactive
    if (dto == null || dto.getDisplayName() == null || dto.getProjectId() == null) {
      return Flux.error(new IllegalArgumentException("DisplayName et ProjectId sont requis"));
    }

    // Optimisation avec gestion des espaces
    String namePattern = dto.getDisplayName().trim() + "%";

    return userRepository
        .findByDisplayNameLikeAndProjectId(namePattern, dto.getProjectId())
        .switchIfEmpty(Flux.empty());
  }
}
