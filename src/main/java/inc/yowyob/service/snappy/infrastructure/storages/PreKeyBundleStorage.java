package inc.yowyob.service.snappy.infrastructure.storages;

import inc.yowyob.service.snappy.domain.model.PreKeyBundle;
import java.util.concurrent.ConcurrentHashMap;
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
