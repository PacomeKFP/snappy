package org.enspy.snappy.server.domain.usecases.organization;

import java.util.UUID;
import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeleteOrganizationUseCase implements UseCase<String, Void> {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public Void execute(String organizationId) {
        // Conversion de l'ID en UUID
        UUID uuid;
        try {
            uuid = UUID.fromString(organizationId);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("L'identifiant fourni n'est pas un UUID valide : " + organizationId, e);
        }

        // Vérifiez que l'organisation existe, sinon lancez une exception
        boolean exists = organizationRepository.existsById(uuid);
        if (!exists) {
            throw new EntityNotFoundException("Organisation avec l'ID " + organizationId + " introuvable.");
        }

        // Supprimez l'organisation
        organizationRepository.deleteById(uuid);
        return null; // Aucun retour nécessaire
    }
}