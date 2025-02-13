package org.enspy.snappy.server.domain.usecases.organization;

import java.util.List;
import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.springframework.stereotype.Service;

@Service
public class GetAllOrganizationsUseCase implements UseCase<Boolean, List<Organization>> {

    private final OrganizationRepository organizationRepository;

    public GetAllOrganizationsUseCase(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    @Override
    public List<Organization> execute(Boolean input) {
        return organizationRepository.findAll();
    }
}