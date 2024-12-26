package org.enspy.snappy.server.presentation.dto.authentication;

import lombok.Data;

@Data
public class AuthenticateOrganizationDto {
    private String email;
    private String password;
}
