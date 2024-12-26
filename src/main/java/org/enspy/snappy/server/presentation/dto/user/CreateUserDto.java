package org.enspy.snappy.server.presentation.dto.user;

import lombok.Data;
import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;

import java.util.Map;

@Data
public class CreateUserDto {

    private String projectId;
    private String externalId;
    private String avatar;
    private String displayName;
    private String email;
    private String phoneNumber;
    private String login;
    private String secret;
    private Map<String, String> customJson;
}
