package inc.yowyob.service.snappy.presentation.controllers;

import inc.yowyob.service.snappy.domain.entities.User;
import inc.yowyob.service.snappy.domain.usecases.user.*;
import inc.yowyob.service.snappy.presentation.dto.user.AddContactDto;
import inc.yowyob.service.snappy.presentation.dto.user.CreateUserDto;
import inc.yowyob.service.snappy.presentation.dto.user.FindUserByDisplayNameDto;
import inc.yowyob.service.snappy.presentation.dto.user.GetUserContactsDto;
import jakarta.validation.Valid;
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

  public UserController(
      AddContactUseCase addContactUseCase,
      CreateUserUseCase createUserUseCase,
      DeleteUserUseCase deleteUserUseCase,
      FindAllUsersUseCase findAllUsersUseCase,
      GetUserContactsUseCase getUserContactsUseCase,
      FindUserByDisplayNameUseCase findUserByDisplayNameUseCase) {
    this.addContactUseCase = addContactUseCase;
    this.createUserUseCase = createUserUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
    this.findAllUsersUseCase = findAllUsersUseCase;
    this.getUserContactsUseCase = getUserContactsUseCase;
    this.findUserByDisplayNameUseCase = findUserByDisplayNameUseCase;
  }

  /** Add a contact to the user's contact list. */
  @PostMapping("/add-contact")
  public Flux<User> addContact(@Valid @RequestBody AddContactDto dto) {
    return addContactUseCase.execute(dto);
  }

  /** Create a new user in the system. */
  @PostMapping("/create")
  public Mono<User> createUser(@Valid @RequestBody CreateUserDto dto) {
    return createUserUseCase.execute(dto);
  }

  /** Delete a user by ID. */
  @DeleteMapping("/{id}")
  public Mono<Void> deleteUser(@PathVariable String id) {
    return deleteUserUseCase.execute(id);
  }

  /** Find all users in a project. */
  @GetMapping("/all/{projectId}")
  public Flux<User> findAllUsers(@PathVariable String projectId) {
    return findAllUsersUseCase.execute(projectId);
  }

  /** Get contacts for a specific user. */
  @PostMapping("/contacts")
  public Flux<User> getUserContacts(@Valid @RequestBody GetUserContactsDto dto) {
    return getUserContactsUseCase.execute(dto);
  }

  /** Find users by display name. */
  @PostMapping("/find-by-display-name")
  public Flux<User> findUserByDisplayName(@Valid @RequestBody FindUserByDisplayNameDto dto) {
    return findUserByDisplayNameUseCase.execute(dto);
  }
}