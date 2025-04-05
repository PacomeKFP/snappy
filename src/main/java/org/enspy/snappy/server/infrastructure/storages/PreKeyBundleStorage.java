package org.enspy.snappy.server.infrastructure.storages;

import java.util.concurrent.ConcurrentHashMap;
import org.enspy.snappy.server.domain.model.PreKeyBundle;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public class PreKeyBundleStorage {
  private final ConcurrentHashMap<String, PreKeyBundle> store = new ConcurrentHashMap<>();

  public Mono<Void> save(String userId, PreKeyBundle bundle) {
    return Mono.fromRunnable(() -> store.put(userId, bundle));
  }

  public Mono<PreKeyBundle> findByUserId(String userId) {
    return Mono.justOrEmpty(store.get(userId));
  }
}