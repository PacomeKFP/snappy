package org.enspy.snappy.server.domain.usecases.authentication;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.exceptions.AuthenticationFailedException;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.authentication.AuthenticateUserDto;
import org.enspy.snappy.server.presentation.resources.AuthenticationResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthenticateUserUseCase implements UseCase<AuthenticateUserDto, AuthenticationResource<User>> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String jwtSecret; // Remplacez par une vraie clé secrète pour plus de sécurité
    @Value("${jwt.expiration}")
    private long jwtExpirationMs; // 1 heure d'expiration

    @Override
    public AuthenticationResource<User> execute(AuthenticateUserDto authenticateUserDto) {
        User user = userRepository
                .findByLoginAndProjectId(authenticateUserDto.getLogin(), authenticateUserDto.getProjectId())
                .orElseThrow(() -> new AuthenticationFailedException("Invalid credential provided; no user with login {" + authenticateUserDto.getLogin() + "} found for the specified project"));

        if (!passwordEncoder.matches(authenticateUserDto.getSecret(), user.getSecret()))
            throw new AuthenticationFailedException("Mot de passe incorrect !");

        String token = Jwts.builder()
                .setSubject(user.getLogin() + ";" + user.getProjectId()).setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        return new AuthenticationResource<User>(user, token);
    }
}
