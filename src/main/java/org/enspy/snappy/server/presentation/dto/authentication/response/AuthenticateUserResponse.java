package org.enspy.snappy.server.presentation.dto.authentication.response;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticateUserResponse {
    private UUID id;
    private String projectId;
    private String externalId;
    private String avatar;
    private String displayName;
    private String email;
    private String phoneNumber;
    private String login;
    private boolean isOnline;
    private UUID organizationId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String token;
}
