package org.enspy.snappy.server.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceRegistrationRequest {

    @NotBlank(message = "Device ID is required")
    private String deviceId;

    @NotBlank(message = "Device type is required")
    private String deviceType;

    @NotBlank(message = "Device name is required")
    private String deviceName;

    private String fcmToken;

    @NotBlank(message = "Temporary code is required")
    private String temporaryCode;

    // Consider adding @NotNull or similar validation if the key is always expected
    private byte[] devicePublicKey;

    private String keyAlgorithm;
}
