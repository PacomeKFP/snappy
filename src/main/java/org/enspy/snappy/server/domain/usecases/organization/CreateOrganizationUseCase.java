package org.enspy.snappy.server.domain.usecases.organization;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.exceptions.EntityAlreadyExistsException;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;
import org.enspy.snappy.server.presentation.dto.organization.CreateOrganizationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CreateOrganizationUseCase implements UseCase<CreateOrganizationDto, Organization> {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public Organization execute(CreateOrganizationDto userId) {
        // Vérification si une organisation avec l'email existe déjà
        if (organizationRepository.findAll()
                .stream()
                .anyMatch(org -> org.getEmail().equals(userId.getEmail()))) {
            throw new EntityAlreadyExistsException("Une organisation avec cet email existe déjà : " + userId.getEmail());
        }

        // Hachage du mot de passe
        String hashedPassword = passwordEncoder.encode(userId.getPassword());

        // Création de l'organisation
        Organization org = new Organization(userId.getName(), userId.getEmail(), hashedPassword);
        org.setProjectId(UUID.randomUUID().toString());
        org.setPrivateKey(UUID.randomUUID().toString());

        // Sauvegarde dans la base
        return organizationRepository.save(org);
    }
}