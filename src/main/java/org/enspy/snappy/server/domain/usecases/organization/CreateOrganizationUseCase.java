package org.enspy.snappy.server.domain.usecases.organization;
  
import java.util.UUID;
import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.exceptions.EntityAlreadyExistsException;
import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.domain.usecases.authentication.AuthenticateOrganizationUseCase;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateOrganizationDto;
import org.enspy.snappy.server.presentation.dto.organization.CreateOrganizationDto;
import org.enspy.snappy.server.presentation.resources.AuthenticationResource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
  public class CreateOrganizationUseCase
      implements MonoUseCase<CreateOrganizationDto, AuthenticationResource<Organization>> {
  
    private final BCryptPasswordEncoder passwordEncoder;
    private final OrganizationRepository organizationRepository;
    private final AuthenticateOrganizationUseCase authenticateOrganizationUseCase;
  
    public CreateOrganizationUseCase(
        BCryptPasswordEncoder passwordEncoder,
        OrganizationRepository organizationRepository,
        AuthenticateOrganizationUseCase authenticateOrganizationUseCase) {
      this.passwordEncoder = passwordEncoder;
      this.organizationRepository = organizationRepository;
      this.authenticateOrganizationUseCase = authenticateOrganizationUseCase;
    }
  
    @Override
    public Mono<AuthenticationResource<Organization>> execute(CreateOrganizationDto createOrganizationDto) {
      // Vérification réactive si une organisation avec l'email existe déjà
      return organizationRepository.existsByEmail(createOrganizationDto.getEmail())
          .flatMap(exists -> {
            if (exists) {
              return Mono.error(new EntityAlreadyExistsException(
                  "Une organisation avec cet email existe déjà : " + createOrganizationDto.getEmail()));
            }
            
            // Hachage du mot de passe
            String hashedPassword = passwordEncoder.encode(createOrganizationDto.getPassword());
            
            // Création de l'organisation
            Organization org = new Organization(
                createOrganizationDto.getName(), 
                createOrganizationDto.getEmail(), 
                hashedPassword);
            org.setProjectId(UUID.randomUUID().toString());
            org.setPrivateKey(UUID.randomUUID().toString());
            
            // Sauvegarde dans la base de façon réactive
            return organizationRepository.save(org)
                .flatMap(savedOrg -> authenticateOrganization(
                    createOrganizationDto.getEmail(), 
                    createOrganizationDto.getPassword()));
          });
    }
  
    private Mono<AuthenticationResource<Organization>> authenticateOrganization(
        String email, String password) {
      AuthenticateOrganizationDto authenticateOrganizationDto = new AuthenticateOrganizationDto();
      authenticateOrganizationDto.setEmail(email);
      authenticateOrganizationDto.setPassword(password);
      return authenticateOrganizationUseCase.execute(authenticateOrganizationDto);
    }
  }