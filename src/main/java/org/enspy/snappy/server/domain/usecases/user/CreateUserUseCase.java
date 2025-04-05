package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.exceptions.ProjectNotFoundException;
import org.enspy.snappy.server.domain.exceptions.UserAlreadyExistsException;
import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.user.CreateUserDto;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.reactive.TransactionalOperator;
import reactor.core.publisher.Mono;

@Service
public class CreateUserUseCase implements MonoUseCase<CreateUserDto, User> {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;
  private final OrganizationRepository organizationRepository;
  private final TransactionalOperator transactionalOperator;

  public CreateUserUseCase(
      UserRepository userRepository,
      OrganizationRepository organizationRepository,
      BCryptPasswordEncoder passwordEncoder,
      TransactionalOperator transactionalOperator) {
    this.userRepository = userRepository;
    this.organizationRepository = organizationRepository;
    this.passwordEncoder = passwordEncoder;
    this.transactionalOperator = transactionalOperator;
  }

  @Override
  public Mono<User> execute(CreateUserDto dto) {
    return validateInput(dto)
        .then(
            organizationRepository
                .findByProjectId(dto.getProjectId())
                .switchIfEmpty(
                    Mono.error(
                        new ProjectNotFoundException(
                            "Projet avec ID '" + dto.getProjectId() + "' introuvable."))))
        .flatMap(organization -> checkUserExists(dto, organization))
        .flatMap(
            organization -> {
              User newUser = new User();
              newUser.setAvatar(dto.getAvatar());
              newUser.setDisplayName(dto.getDisplayName());
              newUser.setEmail(dto.getEmail());
              newUser.setPhoneNumber(dto.getPhoneNumber());
              newUser.setExternalId(dto.getExternalId());
              // TODO: vérifier si le login est unique, sinon lever une exception
              newUser.setLogin(dto.getLogin());
              newUser.setSecret(passwordEncoder.encode(dto.getSecret()));
              // TODO: stocker correctement le customJson (dans la table qui correspond) et ecrire la méthode pour retrieve correctement
              newUser.setCustomJson(dto.getCustomJson());
              newUser.setProjectId(dto.getProjectId());
              newUser.setOrganizationId(organization.getId());
              return userRepository.save(newUser);
            })
        .as(transactionalOperator::transactional);
  }

  private Mono<Void> validateInput(CreateUserDto dto) {
    if (dto == null) {
      return Mono.error(
          new IllegalArgumentException("Les données de l'utilisateur sont requises."));
    }
    if (dto.getExternalId() == null || dto.getExternalId().isEmpty()) {
      return Mono.error(new IllegalArgumentException("ExternalId est requis."));
    }
    if (dto.getDisplayName() == null || dto.getDisplayName().isEmpty()) {
      return Mono.error(new IllegalArgumentException("DisplayName est requis."));
    }
    if (dto.getLogin() == null || dto.getLogin().isEmpty()) {
      return Mono.error(new IllegalArgumentException("Login est requis."));
    }
    if (dto.getSecret() == null || dto.getSecret().isEmpty()) {
      return Mono.error(new IllegalArgumentException("Secret est requis."));
    }
    if (dto.getProjectId() == null || dto.getProjectId().isEmpty()) {
      return Mono.error(new IllegalArgumentException("ProjectId est requis."));
    }
    if (dto.getEmail() != null
        && !dto.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$")) {
      return Mono.error(new IllegalArgumentException("Format d'email invalide."));
    }
    if (dto.getPhoneNumber() != null && !dto.getPhoneNumber().matches("^\\+?[1-9][0-9]{1,14}$")) {
      return Mono.error(new IllegalArgumentException("Format de numéro de téléphone invalide."));
    }
    return Mono.empty();
  }

  private Mono<Organization> checkUserExists(CreateUserDto dto, Organization organization) {
    return userRepository
        .findByExternalIdAndProjectId(dto.getExternalId(), dto.getProjectId())
        .flatMap(
            existingUser ->
                Mono.error(
                    new UserAlreadyExistsException(
                        "Utilisateur avec ID externe '" + dto.getExternalId() + "' existe déjà.")))
        .thenReturn(organization)
        .defaultIfEmpty(organization);
  }
}
