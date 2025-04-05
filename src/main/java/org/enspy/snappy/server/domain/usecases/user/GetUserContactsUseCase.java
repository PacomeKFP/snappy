package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.FluxUseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.services.RelationshipService;
import org.enspy.snappy.server.presentation.dto.user.GetUserContactsDto;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class GetUserContactsUseCase implements FluxUseCase<GetUserContactsDto, User> {

    private final UserRepository userRepository;
    private final RelationshipService relationshipService;

    public GetUserContactsUseCase(UserRepository userRepository, RelationshipService relationshipService) {
        this.userRepository = userRepository;
        this.relationshipService = relationshipService;
    }

    @Override
    public Flux<User> execute(GetUserContactsDto dto) {
        // Validation réactive des entrées
        if (dto.getUserExternalId() == null || dto.getUserExternalId().isBlank() ||
            dto.getProjectId() == null || dto.getProjectId().isBlank()) {
            return Flux.error(new IllegalArgumentException("UserExternalId et ProjectId sont obligatoires"));
        }

        return userRepository.findByExternalIdAndProjectId(dto.getUserExternalId(), dto.getProjectId())
                .switchIfEmpty(Mono.error(new IllegalArgumentException(
                        "Utilisateur avec ID externe " + dto.getUserExternalId() + " introuvable")))
                .flatMapMany(relationshipService::loadUserContacts);
    }
}