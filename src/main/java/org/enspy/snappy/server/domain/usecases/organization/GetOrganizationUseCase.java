package org.enspy.snappy.server.domain.usecases.organization;

import java.util.UUID;
import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetOrganizationUseCase implements UseCase<String, Organization> {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public Organization execute(String organizationId) {
        // Convert the organizationId into UUID to be compatible with OrganizationRepository
        UUID uuid;
        try {
            uuid = UUID.fromString(organizationId);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("L'identifiant fourni n'est pas un UUID valide : " + organizationId, e);
        }

        // Fetch the organization using the repository, or throw an exception if not found
        return organizationRepository.findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Organisation avec l'ID " + organizationId + " introuvable."));
    }
}