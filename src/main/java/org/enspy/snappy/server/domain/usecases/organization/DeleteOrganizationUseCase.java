package org.enspy.snappy.server.domain.usecases.organization;

import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class DeleteOrganizationUseCase {

  private final OrganizationRepository organizationRepository;
  private final UserRepository userRepository;

  public DeleteOrganizationUseCase(
      OrganizationRepository organizationRepository, UserRepository userRepository) {
    this.organizationRepository = organizationRepository;
    this.userRepository = userRepository;
  }

  public Mono<Void> execute(String organizationId) {
    // Supprimer d'abord tous les utilisateurs associés
    // TODO: il faut marquer l'organisation comme inactive
    return Mono.empty();
  }
}
