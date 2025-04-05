package inc.yowyob.service.snappy.domain.usecases.authentication;

import inc.yowyob.service.snappy.domain.entities.Organization;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.OrganizationRepository;
import inc.yowyob.service.snappy.infrastructure.services.JwtService;
import inc.yowyob.service.snappy.presentation.dto.authentication.AuthenticateOrganizationDto;
import inc.yowyob.service.snappy.presentation.resources.AuthenticationResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticateOrganizationUseCase
    implements UseCase<AuthenticateOrganizationDto, AuthenticationResource<Organization>> {

  private final OrganizationRepository organizationRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  @Value("${jwt.secret}")
  private String jwtSecret; // Remplacez par une vraie clé secrète pour plus de sécurité
  @Value("${jwt.expiration}")
  private long jwtExpirationMs; // 1 heure d'expiration

  public AuthenticateOrganizationUseCase(
      OrganizationRepository organizationRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService) {
    this.organizationRepository = organizationRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  @Override
  public AuthenticationResource<Organization> execute(AuthenticateOrganizationDto dto) {

    // Validation robuste des données
    if (dto == null || dto.getEmail() == null || dto.getPassword() == null) {
      throw new IllegalArgumentException("Email et mot de passe sont obligatoires !");
    }

    Organization organization =
        organizationRepository
            .findByEmail(dto.getEmail())
            .orElseThrow(
                () -> new IllegalArgumentException("Aucune organisation trouvée avec cet email."));

    // Vérification du mot de passe
    if (!passwordEncoder.matches(dto.getPassword(), organization.getPassword())) {
      throw new IllegalArgumentException("Mot de passe incorrect !");
    }

    return new AuthenticationResource<Organization>(
        organization, jwtService.generateToken(organization));
  }
}
