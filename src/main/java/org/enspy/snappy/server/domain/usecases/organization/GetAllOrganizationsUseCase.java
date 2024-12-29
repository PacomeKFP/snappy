package org.enspy.snappy.server.domain.usecases.organization;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetAllOrganizationsUseCase implements UseCase<Boolean, List<Organization>> {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public List<Organization> execute(Boolean input) {
        return organizationRepository.findAll();
    }
}