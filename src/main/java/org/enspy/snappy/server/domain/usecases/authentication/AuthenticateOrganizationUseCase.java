package org.enspy.snappy.server.domain.usecases.authentication;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateOrganizationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import java.util.function.Function;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.HashMap;
@Service
public class AuthenticateOrganizationUseCase implements UseCase<AuthenticateOrganizationDto, String> {

    @Autowired
    private final OrganizationRepository organizationRepository;

    @Autowired
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
    //Here
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
    }
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, Organization userDetails) {
        final String OrganizationName = extractUsername(token);
        return (OrganizationName.equals(userDetails.getName()) && !isTokenExpired(token));
    }
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
    //End

    @Override
    public String execute(AuthenticateOrganizationDto dto) {

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

        Map<String, Object> claims = new HashMap<>();
        claims.put("name", organization.getName());
        claims.put("organizationId", organization.getId());
        return createToken(claims,organization.getEmail());
//        return generateToken( organization.getName());
    }
}