package inc.yowyob.service.snappy.presentation.controllers;

import inc.yowyob.service.snappy.domain.entities.Organization;
import inc.yowyob.service.snappy.domain.exceptions.EntityNotFoundException;
import inc.yowyob.service.snappy.domain.usecases.organization.CreateOrganizationUseCase;
import inc.yowyob.service.snappy.domain.usecases.organization.DeleteOrganizationUseCase;
import inc.yowyob.service.snappy.domain.usecases.organization.GetAllOrganizationsUseCase;
import inc.yowyob.service.snappy.domain.usecases.organization.GetOrganizationUseCase;
import inc.yowyob.service.snappy.presentation.dto.organization.CreateOrganizationDto;
import inc.yowyob.service.snappy.presentation.resources.AuthenticationResource;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Objects;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
  public ResponseEntity<AuthenticationResource<Organization>> create(
      @RequestBody @Valid CreateOrganizationDto createOrganizationDto) {
    AuthenticationResource<Organization> authenticationResource =
        createOrganizationUseCase.execute(createOrganizationDto);
    return ResponseEntity.status(201).body(authenticationResource);
  }

  @GetMapping("/getAll/{key}")
  public ResponseEntity<List<Organization>> getAllOrganizations(@PathVariable String key) {
    if (!Objects.equals(key, "password"))
      return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).body(List.of());
    List<Organization> organizations = getAllOrganizationsUseCase.execute(true); // Aucun paramètre
    return ResponseEntity.ok(organizations);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Organization> getOrganizationById(@PathVariable String id) {
    try {
      Organization organization = getOrganizationUseCase.execute(id);
      return ResponseEntity.ok(organization); // Retourne un code 200 avec l'organisation
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(404)
          .body(null); // Retourne un code 404 si l'organisation n'existe pas
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(400).body(null); // Retourne un code 400 pour un UUID invalide
    }
  }

  @DeleteMapping("/{id}")
  @SecurityRequirement(name = "bearerAuth")
  public ResponseEntity<Void> deleteOrganization(@PathVariable String id) {
    try {
      deleteOrganizationUseCase.execute(id); // Appelle le UseCase pour la suppression
      return ResponseEntity.noContent().build(); // Retourne 204 No Content en cas de succès
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(404).build(); // Retourne 404 si l'organisation n'existe pas
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(400).build(); // Retourne 400 si l'ID est invalide
    }
  }
}
