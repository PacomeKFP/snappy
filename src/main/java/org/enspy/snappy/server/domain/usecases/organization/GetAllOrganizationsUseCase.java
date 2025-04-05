package org.enspy.snappy.server.domain.usecases.organization;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.usecases.FluxUseCase;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class GetAllOrganizationsUseCase implements FluxUseCase<Void, Organization> {

    private final OrganizationRepository organizationRepository;

    public GetAllOrganizationsUseCase(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    @Override
    public Flux<Organization> execute(Void unused) {
        return organizationRepository.findAll();
    }
}