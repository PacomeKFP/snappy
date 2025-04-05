package org.enspy.snappy.server.presentation.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import java.util.Objects;
import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.usecases.organization.CreateOrganizationUseCase;
import org.enspy.snappy.server.domain.usecases.organization.DeleteOrganizationUseCase;
import org.enspy.snappy.server.domain.usecases.organization.GetAllOrganizationsUseCase;
import org.enspy.snappy.server.domain.usecases.organization.GetOrganizationUseCase;
import org.enspy.snappy.server.presentation.dto.organization.CreateOrganizationDto;
import org.enspy.snappy.server.presentation.resources.AuthenticationResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/organizations")
public class OrganizationController {
  private final GetOrganizationUseCase getOrganizationUseCase;
  private final DeleteOrganizationUseCase deleteOrganizationUseCase;
  private final CreateOrganizationUseCase createOrganizationUseCase;
  private final GetAllOrganizationsUseCase getAllOrganizationsUseCase;

  public OrganizationController(
      GetOrganizationUseCase getOrganizationUseCase,
      DeleteOrganizationUseCase deleteOrganizationUseCase,
      CreateOrganizationUseCase createOrganizationUseCase,
      GetAllOrganizationsUseCase getAllOrganizationsUseCase) {
    this.getOrganizationUseCase = getOrganizationUseCase;
    this.deleteOrganizationUseCase = deleteOrganizationUseCase;
    this.createOrganizationUseCase = createOrganizationUseCase;
    this.getAllOrganizationsUseCase = getAllOrganizationsUseCase;
  }

  @PostMapping
  public Mono<ResponseEntity<AuthenticationResource<Organization>>> create(
      @RequestBody @Valid CreateOrganizationDto createOrganizationDto) {
    return createOrganizationUseCase.execute(createOrganizationDto).map(ResponseEntity::ok);
  }

  @GetMapping("/getAll/{key}")
  public Flux<Organization> getAllOrganizations(@PathVariable String key) {
    if (!Objects.equals(key, "password")) {
      return Flux.empty();
    }
    return getAllOrganizationsUseCase.execute(null);
  }

  @GetMapping("/{id}")
  public Mono<ResponseEntity<Organization>> getOrganizationById(@PathVariable String id) {
    return getOrganizationUseCase.execute(id).map(ResponseEntity::ok);
  }

  @DeleteMapping("/{id}")
  @SecurityRequirement(name = "bearerAuth")
  public Mono<ResponseEntity<Void>> deleteOrganization(@PathVariable String id) {
    return deleteOrganizationUseCase
        .execute(id)
        .thenReturn(ResponseEntity.noContent().<Void>build());
  }
}
