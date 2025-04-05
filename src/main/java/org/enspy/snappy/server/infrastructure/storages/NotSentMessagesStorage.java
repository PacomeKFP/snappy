package org.enspy.snappy.server.infrastructure.storages;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import org.enspy.snappy.server.domain.entities.Message;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public class NotSentMessagesStorage {
    /**
     * [UserExternalId]: [notSentMessages]
     * */
    private final ConcurrentHashMap<String, ArrayList<Message>> notSentMessages = new ConcurrentHashMap<>();

    public Mono<Void> addNotSentMessageForUser(String userId, Message message) {
        return Mono.fromRunnable(() -> {
            notSentMessages.computeIfAbsent(userId, k -> new ArrayList<>()).add(message);
        });
    }
    
    public Mono<Void> removeNotSentMessageForUser(String userId, Message message) {
        return Mono.fromRunnable(() -> {
            if (notSentMessages.containsKey(userId)) {
                notSentMessages.get(userId).remove(message);
            }
        });
    }
    
    public Mono<Void> clearNotSentMessagesForUser(String userId) {
        return Mono.fromRunnable(() -> notSentMessages.remove(userId));
    }
    
    public Flux<Message> getNotSentMessagesForUser(String userId) {
        return Mono.justOrEmpty(notSentMessages.get(userId))
            .defaultIfEmpty(new ArrayList<>())
            .flatMapMany(Flux::fromIterable);
    }
}