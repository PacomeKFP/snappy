package org.enspy.snappy.server.domain.usecases.user;

import java.util.UUID;
import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class DeleteUserUseCase implements MonoUseCase<String, Void> {

  private final UserRepository userRepository;

  public DeleteUserUseCase(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public Mono<Void> execute(String userId) {
    if (userId == null || userId.isBlank()) {
      return Mono.error(new IllegalArgumentException("L'ID utilisateur ne peut pas être vide"));
    }

    // Conversion UUID avec gestion d'erreur réactive
    UUID userUuid;
    try {
      userUuid = UUID.fromString(userId);
    } catch (IllegalArgumentException ex) {
      return Mono.error(new IllegalArgumentException("Format d'ID utilisateur invalide."));
    }

    // Vérification réactive de l'existence et suppression
    return userRepository
        .existsById(userUuid)
        .flatMap(
            exists -> {
              if (!exists) {
                return Mono.error(
                    new IllegalArgumentException("Utilisateur avec ID " + userId + " inexistant."));
              }
              return userRepository.deleteById(userUuid);
            });
  }
}
