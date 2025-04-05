package org.enspy.snappy.server.infrastructure.configs;

import io.r2dbc.spi.ConnectionFactory;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.ReactiveAuditorAware;
import org.springframework.data.r2dbc.config.AbstractR2dbcConfiguration;
import org.springframework.data.r2dbc.config.EnableR2dbcAuditing;
import org.springframework.data.r2dbc.mapping.event.BeforeConvertCallback;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;
import org.springframework.r2dbc.core.DatabaseClient;
import reactor.core.publisher.Mono;

@Configuration
@EnableR2dbcAuditing
@EnableR2dbcRepositories(basePackages = "org.enspy.snappy.server.infrastructure.repositories")
public class R2dbcConfig extends AbstractR2dbcConfiguration {

    private final ConnectionFactory connectionFactory;

    public R2dbcConfig(ConnectionFactory connectionFactory) {
        this.connectionFactory = connectionFactory;
    }

    @Override
    public @NotNull ConnectionFactory connectionFactory() {
        return connectionFactory;
    }

    @Bean
    public @NotNull DatabaseClient databaseClient() {
        return DatabaseClient.create(connectionFactory);
    }

    @Override
    protected @NotNull List<Object> getCustomConverters() {
        // Ajoutez ici des convertisseurs personnalisés si nécessaire
        // Exemple : converters.add(new JsonToMapConverter());
        return new ArrayList<>();
    }

    @Bean
    public ReactiveAuditorAware<String> auditorProvider() {
        return () -> Mono.just("SYSTEM");
    }

    @Bean
    public BeforeConvertCallback<Object> beforeConvertCallback() {
        return (entity, table) -> {
            try {
                Class<?> clazz = entity.getClass();
                Field idField = findIdField(clazz);

                if (idField != null && idField.getType() == UUID.class) {
                    idField.setAccessible(true);
                    if (idField.get(entity) == null) {
                        idField.set(entity, UUID.randomUUID());
                    }
                }
            } catch (Exception e) {
                return Mono.error(e);
            }
            return Mono.just(entity);
        };
    }

    private Field findIdField(Class<?> clazz) {
        for (Field field : clazz.getDeclaredFields()) {
            if (field.isAnnotationPresent(org.springframework.data.annotation.Id.class)) {
                return field;
            }
        }
        return null;
    }
}