package org.enspy.snappy.server.domain.usecases.authentication;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.exceptions.AuthenticationFailedException;
import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.infrastructure.services.JwtService;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateOrganizationDto;
import org.enspy.snappy.server.presentation.resources.AuthenticationResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
    public class AuthenticateOrganizationUseCase implements MonoUseCase<AuthenticateOrganizationDto, AuthenticationResource<Organization>> {

        private final OrganizationRepository organizationRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;

        @Value("${jwt.secret}")
        private String jwtSecret;

        @Value("${jwt.expiration}")
        private long jwtExpirationMs;

        public AuthenticateOrganizationUseCase(OrganizationRepository organizationRepository,
                                               PasswordEncoder passwordEncoder,
                                               JwtService jwtService) {
            this.organizationRepository = organizationRepository;
            this.passwordEncoder = passwordEncoder;
            this.jwtService = jwtService;
        }

        @Override
        public Mono<AuthenticationResource<Organization>> execute(AuthenticateOrganizationDto dto) {
            // Validation des entrées
            if (dto == null || dto.getEmail() == null || dto.getPassword() == null) {
                return Mono.error(new IllegalArgumentException("Email et mot de passe sont obligatoires !"));
            }

    return organizationRepository
        .findByEmail(dto.getEmail())
        .switchIfEmpty(
            Mono.error(new EntityNotFoundException("Aucune organisation trouvée avec cet email.")))
        .flatMap(
            organization -> {
              // Vérification du mot de passe
              if (!passwordEncoder.matches(dto.getPassword(), organization.getPassword())) {
                return Mono.error(new AuthenticationFailedException("Mot de passe incorrect !"));
              }

              // Génération du token JWT
              return jwtService
                  .generateTokenReactive(organization)
                  .map(token -> new AuthenticationResource<>(organization, token));
            });
        }
    }