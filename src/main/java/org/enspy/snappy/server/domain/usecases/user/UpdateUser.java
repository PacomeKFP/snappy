package org.enspy.snappy.server.domain.usecases.user;

import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.user.CreateUserDto;

public class UpdateUser implements UseCase<CreateUserDto, User> {
    @Override
    public User execute(CreateUserDto dto) {
        return null;
    }
}
