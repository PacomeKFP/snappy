package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.usecases.UseCase;

public class DeleteUser implements UseCase<String, Void> {
    @Override
    public Void execute(String user) {
        return null;
    }
}
