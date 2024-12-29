package org.enspy.snappy.server.infrastructure.stores;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class Stores {

    private final HashMap<String, String> connectedUsers = new HashMap<>();

    @Bean
    public HashMap<String, String> initializeConnectedUsers() {
        return connectedUsers;
    }

}