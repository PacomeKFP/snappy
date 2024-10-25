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
    private String picture;
    private String bio;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt= LocalDateTime.now();
}


