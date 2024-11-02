package org.enspy.snappy.controllers;

import org.enspy.snappy.controllers.dto.LoginDto;
import org.enspy.snappy.models.Message;
import org.enspy.snappy.models.User;
import org.enspy.snappy.services.MessageService;
import org.enspy.snappy.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    public UserService userService;

    @PostMapping
    public User postMessage(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public Optional<User> postMessage(@RequestBody LoginDto loginDto) {
        return userService.findUserByEmailAndPassword(loginDto.email, loginDto.password);
    }

    @GetMapping
    public List<User> findAllUsers() {
        return userService.findAllUsers();
    }


}
