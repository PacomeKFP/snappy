package org.enspy.snappy.server.presentation.controllers;

import jakarta.validation.Valid;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.user.*;
import org.enspy.snappy.server.presentation.dto.user.AddContactDto;
import org.enspy.snappy.server.presentation.dto.user.CreateUserDto;
import org.enspy.snappy.server.presentation.dto.user.FindUserByDisplayNameDto;
import org.enspy.snappy.server.presentation.dto.user.GetUserContactsDto;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@Validated
@RequestMapping("/users")
public class UserController {

  private final AddContactUseCase addContactUseCase;
  private final CreateUserUseCase createUserUseCase;
  private final DeleteUserUseCase deleteUserUseCase;
  private final FindAllUsersUseCase findAllUsersUseCase;
  private final GetUserContactsUseCase getUserContactsUseCase;
  private final FindUserByDisplayNameUseCase findUserByDisplayNameUseCase;

  public UserController(AddContactUseCase addContactUseCase, CreateUserUseCase createUserUseCase, DeleteUserUseCase deleteUserUseCase, FindAllUsersUseCase findAllUsersUseCase, GetUserContactsUseCase getUserContactsUseCase, FindUserByDisplayNameUseCase findUserByDisplayNameUseCase) {
    this.addContactUseCase = addContactUseCase;
    this.createUserUseCase = createUserUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
    this.findAllUsersUseCase = findAllUsersUseCase;
    this.getUserContactsUseCase = getUserContactsUseCase;
    this.findUserByDisplayNameUseCase = findUserByDisplayNameUseCase;
  }

  @PostMapping("/add-contact")
  public Flux<User> addContact(@Valid @RequestBody AddContactDto dto) {
    return  addContactUseCase.execute(dto);
  }

  @PostMapping("/create")
  public Mono<ResponseEntity<User>> createUser(@Valid @RequestBody CreateUserDto dto) {
    return createUserUseCase.execute(dto)
               .map(ResponseEntity::ok);
  }

  @GetMapping("/find-all")
  public Flux<User> findAllUsers(@RequestParam String projectId) {
    return findAllUsersUseCase.execute(projectId);
  }

  @PostMapping("/filter/display-name")
  public Flux<User> filterUser(@Valid @RequestBody FindUserByDisplayNameDto dto) {
    return findUserByDisplayNameUseCase.execute(dto);
  }

  @PostMapping("/get-contacts")
  public Flux<User> getUserContacts(@Valid @RequestBody GetUserContactsDto dto) {
    return getUserContactsUseCase.execute(dto);
  }

  @DeleteMapping("/delete/{userId}")
  public Mono<ResponseEntity<Void>> deleteUser(@PathVariable String userId) {
    return deleteUserUseCase.execute(userId)
             .thenReturn(ResponseEntity.noContent().build());
  }
}
