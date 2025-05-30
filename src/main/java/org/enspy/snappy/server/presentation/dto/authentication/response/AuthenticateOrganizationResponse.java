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
public class AuthenticateOrganizationResponse {
    private UUID id;
    private String name;
    private String email;
    private String projectId;
    private String privateKey;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String token;
}
