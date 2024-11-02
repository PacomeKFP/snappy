package org.enspy.snappy.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Table
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {
    @PrimaryKey
    private UUID uuid = UUID.randomUUID();

    @CassandraType(type = CassandraType.Name.LIST, typeArguments = CassandraType.Name.UUID)
    private List<UUID> users = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

}
