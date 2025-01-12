package org.enspy.snappy.server.presentation.controllers;

import jakarta.validation.Valid;
import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.exceptions.EntityAlreadyExistsException;
import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
import org.enspy.snappy.server.domain.usecases.organization.CreateOrganizationUseCase;
import org.enspy.snappy.server.domain.usecases.organization.DeleteOrganizationUseCase;
import org.enspy.snappy.server.domain.usecases.organization.GetAllOrganizationsUseCase;
import org.enspy.snappy.server.domain.usecases.organization.GetOrganizationUseCase;
import org.enspy.snappy.server.presentation.dto.organization.CreateOrganizationDto;
import org.enspy.snappy.server.presentation.resources.AuthenticateOrganizationResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/organizations")
public class OrganizationController {
    @Autowired
    private CreateOrganizationUseCase createOrganizationUseCase;
    @Autowired
    private GetOrganizationUseCase getOrganizationUseCase;
    @Autowired
    private DeleteOrganizationUseCase deleteOrganizationUseCase;
    @Autowired
    private GetAllOrganizationsUseCase getAllOrganizationsUseCase;

    @PostMapping
    public ResponseEntity<AuthenticateOrganizationResource> create(@RequestBody @Valid CreateOrganizationDto createOrganizationDto) {
        AuthenticateOrganizationResource organization = createOrganizationUseCase.execute(createOrganizationDto);
        return ResponseEntity.status(201).body(organization);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Organization>> getAllOrganizations() {
        List<Organization> organizations = getAllOrganizationsUseCase.execute(true); // Aucun paramètre
        return ResponseEntity.ok(organizations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Organization> getOrganizationById(@PathVariable String id) {
        try {
            Organization organization = getOrganizationUseCase.execute(id);
            return ResponseEntity.ok(organization); // Retourne un code 200 avec l'organisation
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(null); // Retourne un code 404 si l'organisation n'existe pas
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(null); // Retourne un code 400 pour un UUID invalide
        }
    }

    @DeleteMapping("/{id}")
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
