package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.FluxUseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
public class FindAllUsersUseCase implements FluxUseCase<String, User> {

    private final UserRepository userRepository;

    public FindAllUsersUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Flux<User> execute(String projectId) {
        // Validation réactive
        if (projectId == null || projectId.isEmpty()) {
            return Flux.error(new IllegalArgumentException("L'ID de projet ne peut pas être vide."));
        }

        // Optimisation avec handle pour traiter les erreurs potentielles
        return userRepository.findByProjectId(projectId)
            .onErrorResume(e -> Flux.error(new RuntimeException("Erreur lors de la récupération des utilisateurs", e)))
            .switchIfEmpty(Flux.empty());
    }
}