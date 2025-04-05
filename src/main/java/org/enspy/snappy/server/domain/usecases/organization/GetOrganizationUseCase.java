package org.enspy.snappy.server.domain.usecases.organization;

import java.util.UUID;
import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class GetOrganizationUseCase implements MonoUseCase<String, Organization> {
    private final OrganizationRepository organizationRepository;

    public GetOrganizationUseCase(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public Mono<Organization> execute(String organizationId) {
        UUID uuid;
        try {
            uuid = UUID.fromString(organizationId);
        } catch (IllegalArgumentException e) {
            return Mono.error(new IllegalArgumentException("L'identifiant fourni n'est pas un UUID valide : " + organizationId, e));
        }

        return organizationRepository.findById(uuid)
                .switchIfEmpty(Mono.error(new EntityNotFoundException("Organisation avec l'ID " + organizationId + " introuvable.")));
    }
}