package org.enspy.snappy.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
public class User {

    @PrimaryKey
    private UUID uuid = UUID.randomUUID();
    private String name;
    private String email;
    private String password;
    private String phone;
    private String profilePicture;
    private String bio;
//     private UserStatus status;
//    private LocalDateTime lastSeen;
    // Getters et Setters

    public User(String name, String password, String email, String phone) {
        this.name = name;
        // TODO: hash password before saving
        this.password = password;
        this.email = email;
        this.phone = phone;
    }
}
