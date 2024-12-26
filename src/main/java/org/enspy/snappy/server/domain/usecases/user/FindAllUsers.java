package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;

import java.util.List;

public class FindAllUsers implements UseCase<String, List<User>> {
    @Override
    public List<User> execute(String projectId) {
        return null;
    }
}
