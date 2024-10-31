package org.enspy.snappy.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.*;

@Data
@Table
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {
    @PrimaryKey
    private UUID uuid = UUID.randomUUID();

    @CassandraType(type = CassandraType.Name.LIST, typeArguments = CassandraType.Name.UUID)
    private List<UUID> users = new ArrayList<>();

    /**
     * -1: Off, 0: Listen, 1: On
     */
    @CassandraType(type = CassandraType.Name.MAP, typeArguments = {CassandraType.Name.UUID, CassandraType.Name.INT})
    private Map<UUID, Integer> states = new HashMap<>();
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

}
