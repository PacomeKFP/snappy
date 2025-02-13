package org.enspy.snappy.server.infrastructure.storages;

import java.util.concurrent.ConcurrentHashMap;
import org.enspy.snappy.server.domain.model.PreKeyBundle;
import org.springframework.stereotype.Repository;

@Repository
public class PreKeyBundleStorage {
  private final ConcurrentHashMap<String, PreKeyBundle> store = new ConcurrentHashMap<>();

  public void save(String userId, PreKeyBundle bundle) {
    store.put(userId, bundle);
  }

  public PreKeyBundle findByUserId(String userId) {
    return store.get(userId);
  }
}
