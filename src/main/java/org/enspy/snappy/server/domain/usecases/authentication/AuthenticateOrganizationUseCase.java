package org.enspy.snappy.server.domain.usecases.authentication;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateOrganizationDto;
import org.enspy.snappy.server.presentation.resources.AuthenticationResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class AuthenticateOrganizationUseCase implements UseCase<AuthenticateOrganizationDto, AuthenticationResource<Organization>> {

    private final OrganizationRepository organizationRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String jwtSecret; // Remplacez par une vraie clé secrète pour plus de sécurité
    @Value("${jwt.expiration}")
    private long jwtExpirationMs; // 1 heure d'expiration

    public AuthenticateOrganizationUseCase(OrganizationRepository organizationRepository,
                                           PasswordEncoder passwordEncoder) {
        this.organizationRepository = organizationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthenticationResource<Organization> execute(AuthenticateOrganizationDto dto) {

        // Validation robuste des données
        if (dto == null || dto.getEmail() == null || dto.getPassword() == null) {
            throw new IllegalArgumentException("Email et mot de passe sont obligatoires !");
        }

        Organization organization = organizationRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Aucune organisation trouvée avec cet email."));

        // Vérification du mot de passe
        if (!passwordEncoder.matches(dto.getPassword(), organization.getPassword())) {
            throw new IllegalArgumentException("Mot de passe incorrect !");
        }

             String token = Jwts.builder()
                .setSubject(organization.getEmail()).setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        return  new AuthenticationResource<Organization>(organization, token);
    }
}