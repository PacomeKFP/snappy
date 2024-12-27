package org.enspy.snappy.server.presentation.controllers;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.user.*;
import org.enspy.snappy.server.presentation.dto.user.AddContactDto;
import org.enspy.snappy.server.presentation.dto.user.CreateUserDto;
import org.enspy.snappy.server.presentation.dto.user.GetUserContactsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/user")
@Validated
public class UserController {

    @Autowired
    private AddContactUseCase addContactUseCase;

    @Autowired
    private CreateUserUseCase createUserUseCase;

    @Autowired
    private FindAllUsers findAllUsersUseCase;

    @Autowired
    private DeleteUser deleteUserUseCase;

    @Autowired
    private GetUserContactsUseCase getUserContactsUseCase;



    /**
     * Add a contact to the user's contact list.
     */
    @PostMapping("/add-contact")
    public ResponseEntity<List<User>> addContact(@Valid @RequestBody AddContactDto dto) {
        List<User> updatedContacts = addContactUseCase.execute(dto);
        return ResponseEntity.ok(updatedContacts);
    }

    /**
     * Create a new user in the system.
     */
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserDto dto) {
        User newUser = createUserUseCase.execute(dto);
        return ResponseEntity.ok(newUser);
    }

    /**
     * Retrieve all users for a project ID.
     */
    @GetMapping("/find-all")
    public ResponseEntity<List<User>> findAllUsers(@RequestParam String projectId) {
        List<User> users = findAllUsersUseCase.execute(projectId);
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

    /**
     * Delete a user by their unique ID.
     */
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        deleteUserUseCase.execute(userId);
        return ResponseEntity.noContent().build();
    }
}