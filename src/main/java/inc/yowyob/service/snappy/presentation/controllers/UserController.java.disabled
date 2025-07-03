package inc.yowyob.service.snappy.presentation.controllers;

import inc.yowyob.service.snappy.domain.entities.User;
import inc.yowyob.service.snappy.domain.usecases.user.*;
import inc.yowyob.service.snappy.presentation.dto.user.AddContactDto;
import inc.yowyob.service.snappy.presentation.dto.user.CreateUserDto;
import inc.yowyob.service.snappy.presentation.dto.user.FindUserByDisplayNameDto;
import inc.yowyob.service.snappy.presentation.dto.user.GetUserContactsDto;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
  public ResponseEntity<List<User>> addContact(@Valid @RequestBody AddContactDto dto) {
    List<User> updatedContacts = addContactUseCase.execute(dto);
    return ResponseEntity.ok(updatedContacts);
  }

  /** Create a new user in the system. */
  @PostMapping("/create")
  public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserDto dto) {
    User newUser = createUserUseCase.execute(dto);
    return ResponseEntity.ok(newUser);
  }

  /** Retrieve all users for a project ID. */
  @GetMapping("/find-all")
  public ResponseEntity<List<User>> findAllUsers(@RequestParam String projectId) {
    List<User> users = findAllUsersUseCase.execute(projectId);
    return ResponseEntity.ok(users);
  }

  @PostMapping("/filter/display-name")
  public ResponseEntity<List<User>> filterUser(@Valid @RequestBody FindUserByDisplayNameDto dto) {
    List<User> users = findUserByDisplayNameUseCase.execute(dto);
    return ResponseEntity.ok(users);
  }

  /**
   * Get the contact list of a user based on their external ID and project ID.
   *
   * @param dto Contains userExternalId and projectId.
   * @return List of contacts associated with the user.
   */
  @PostMapping("/get-contacts")
  public ResponseEntity<List<User>> getUserContacts(@Valid @RequestBody GetUserContactsDto dto) {
    List<User> contacts = getUserContactsUseCase.execute(dto);
    return ResponseEntity.ok(contacts);
  }

  /** Delete a user by their unique ID. */
  @DeleteMapping("/delete/{userId}")
  public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
    deleteUserUseCase.execute(userId);
    return ResponseEntity.noContent().build();
  }
}
