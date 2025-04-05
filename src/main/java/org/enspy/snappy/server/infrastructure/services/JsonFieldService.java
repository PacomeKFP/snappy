package org.enspy.snappy.server.infrastructure.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.enspy.snappy.server.domain.entities.User;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class JsonFieldService {

    private final DatabaseClient databaseClient;
    private final ObjectMapper objectMapper;

    public JsonFieldService(DatabaseClient databaseClient, ObjectMapper objectMapper) {
        this.databaseClient = databaseClient;
        this.objectMapper = objectMapper;
    }

    public Mono<Map<String, String>> getUserCustomJson(UUID userId) {
        return databaseClient
                .sql("SELECT custom_json FROM users WHERE id = :userId")
                .bind("userId", userId)
                .map((row, metadata) -> {
                    String json = row.get("custom_json", String.class);
                    if (json == null || json.isEmpty()) {
                        return new HashMap<String, String>();
                    }
                    try {
                        return objectMapper.readValue(json, new TypeReference<Map<String, String>>() {});
                    } catch (JsonProcessingException e) {
                        return new HashMap<String, String>();
                    }
                })
                .one()
                .defaultIfEmpty(new HashMap<>());
    }

    public Mono<Void> updateUserCustomJson(UUID userId, Map<String, String> customJson) {
        try {
            String json = objectMapper.writeValueAsString(customJson);
            return databaseClient
                    .sql("UPDATE users SET custom_json = :json WHERE id = :userId")
                    .bind("json", json)
                    .bind("userId", userId)
                    .fetch()
                    .rowsUpdated()
                    .then();
        } catch (JsonProcessingException e) {
            return Mono.error(e);
        }
    }

    public Mono<User> loadUserCustomJson(User user) {
        if (user.getId() == null) {
            return Mono.just(user);
        }
        return getUserCustomJson(user.getId())
                .map(customJson -> {
                    user.setCustomJson(customJson);
                    return user;
                });
    }
}