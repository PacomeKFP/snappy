package org.enspy.snappy.server.presentation.dto.device;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceRegistrationCodeResponse {
    private String code;
    private LocalDateTime expiresAt;
}
