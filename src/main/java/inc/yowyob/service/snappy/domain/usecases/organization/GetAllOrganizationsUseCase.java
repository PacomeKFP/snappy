package inc.yowyob.service.snappy.domain.usecases.organization;

import inc.yowyob.service.snappy.domain.entities.Organization;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.OrganizationRepository;
import java.util.List;
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
