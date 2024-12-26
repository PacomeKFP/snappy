package org.enspy.snappy.server.presentation.dto.user;

import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;

import java.util.List;

public class GetUserContacts implements UseCase<String, List<User>> {
    @Override
    public List<User> execute(String dto) {
        return List.of();
    }
}
