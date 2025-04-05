package org.enspy.snappy.server.infrastructure.services;
  
import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
  @Qualifier("UserDetailsServiceImpl")
  public class UserDetailsServiceImpl implements ReactiveUserDetailsService {
  
    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
  
    public UserDetailsServiceImpl(UserRepository userRepository, OrganizationRepository organizationRepository) {
      this.userRepository = userRepository;
      this.organizationRepository = organizationRepository;
    }
  
    @Override
    public Mono<UserDetails> findByUsername(String username) {
      if (username.contains("@") && username.contains(".")) {
        return organizationRepository
            .findByEmail(username)
            .cast(UserDetails.class)
            .switchIfEmpty(Mono.error(new EntityNotFoundException("Organization not found")));
      }
  
      String[] parts = username.split(";");
      if (parts.length != 2) {
        return Mono.error(new IllegalArgumentException(
            "Invalid username format. Expected format: login;projectId"));
      }
  
      String login = parts[0];
      String projectId = parts[1];
  
      return userRepository
          .findByLoginAndProjectId(login, projectId)
          .cast(UserDetails.class)
          .switchIfEmpty(Mono.error(new EntityNotFoundException("User not found")));
    }
  }