package org.enspy.snappy.server.domain.usecases.signal;

import org.enspy.snappy.server.domain.model.PreKeyBundle;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.storages.PreKeyBundleStorage;
import org.springframework.stereotype.Service;

@Service
public class RegisterPreKeyBundleUseCase implements UseCase<RegisterPreKeyBundleUseCase.Input, Void> {

    private final PreKeyBundleStorage preKeyBundleStorage;

    public RegisterPreKeyBundleUseCase(PreKeyBundleStorage preKeyBundleStorage) {
        this.preKeyBundleStorage = preKeyBundleStorage;
    }

    @Override
    public Void execute(Input input) {
        if(input == null || input.getUserId() == null || input.getPreKeyBundle() == null) {
            throw new IllegalArgumentException("Les données d'enregistrement ne peuvent pas être nulles");
        }
        preKeyBundleStorage.save(input.getUserId(), input.getPreKeyBundle());
        return null;
    }

    public static class Input {
        private final String userId;
        private final PreKeyBundle preKeyBundle;

        public Input(String userId, PreKeyBundle preKeyBundle) {
            this.userId = userId;
            this.preKeyBundle = preKeyBundle;
        }

        public String getUserId() {
            return userId;
        }

        public PreKeyBundle getPreKeyBundle() {
            return preKeyBundle;
        }
    }
}

