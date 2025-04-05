package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.FluxUseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.services.RelationshipService;
import org.enspy.snappy.server.presentation.dto.user.AddContactDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.reactive.TransactionalOperator;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class AddContactUseCase implements FluxUseCase<AddContactDto, User> {

  private final UserRepository userRepository;
  private final RelationshipService relationshipService;
  private final TransactionalOperator transactionalOperator;

  public AddContactUseCase(
      UserRepository userRepository,
      RelationshipService relationshipService,
      TransactionalOperator transactionalOperator) {
    this.userRepository = userRepository;
    this.relationshipService = relationshipService;
    this.transactionalOperator = transactionalOperator;
  }

  @Override
  public Flux<User> execute(AddContactDto dto) {
    if (dto == null
        || dto.getRequesterId() == null
        || dto.getContactId() == null
        || dto.getProjectId() == null) {
      return Flux.error(new IllegalArgumentException("Paramètres requis manquants"));
    }

    Mono<User> requesterMono =
        userRepository
            .findByExternalIdAndProjectId(dto.getRequesterId(), dto.getProjectId())
            .switchIfEmpty(
                Mono.error(new IllegalArgumentException("Demandeur introuvable dans le projet")));

    Mono<User> contactMono =
        userRepository
            .findByExternalIdAndProjectId(dto.getContactId(), dto.getProjectId())
            .switchIfEmpty(
                Mono.error(new IllegalArgumentException("Contact introuvable dans le projet")));

    return Mono.zip(requesterMono, contactMono)
        .flatMap(
            tuple -> {
              User requester = tuple.getT1();
              User contact = tuple.getT2();

              // Utilisation des méthodes du repository
              return userRepository
                  .existsContactRelation(requester.getId(), contact.getId())
                  .flatMap(
                      exists -> {
                        if (Boolean.TRUE.equals(exists)) {
                          return Mono.error(
                              new IllegalArgumentException("Contact déjà dans la liste"));
                        }

                        return userRepository
                            .addContactRelation(requester.getId(), contact.getId())
                            .thenReturn(requester);
                      });
            })
        .flatMapMany(relationshipService::loadUserContacts)
        .as(transactionalOperator::transactional); // Transaction réactive
  }
}
