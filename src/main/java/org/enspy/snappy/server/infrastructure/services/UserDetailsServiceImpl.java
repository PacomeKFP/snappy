package org.enspy.snappy.server.infrastructure.services;

import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
import org.enspy.snappy.server.infrastructure.repositories.OrganizationRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@Qualifier("UserDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepository userRepository;
  private final OrganizationRepository organizationRepository;

  public UserDetailsServiceImpl(UserRepository userRepository, OrganizationRepository organizationRepository) {
    this.userRepository = userRepository;
    this.organizationRepository = organizationRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    if (username.contains("@") && username.contains(".")) {
      return organizationRepository
          .findByEmail(username)
          .orElseThrow(() -> new EntityNotFoundException("Organization not found"));
    }

    String[] parts = username.split(";");
    if (parts.length != 2) {
      throw new IllegalArgumentException(
          "Invalid username format. Expected format: login;projectId");
    }

    String login = parts[0];
    String projectId = parts[1];

    return userRepository
        .findByLoginAndProjectId(login, projectId)
        .orElseThrow(() -> new EntityNotFoundException("User not found"));
  }
}
