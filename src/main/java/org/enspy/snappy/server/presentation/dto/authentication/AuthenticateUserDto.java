package org.enspy.snappy.server.presentation.dto.authentication;

import lombok.Data;

@Data
public class AuthenticateUserDto {
    private String login;
    private String secret;
}
