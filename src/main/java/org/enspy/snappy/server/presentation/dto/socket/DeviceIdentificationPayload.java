package org.enspy.snappy.server.presentation.dto.socket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceIdentificationPayload {

    @NotBlank(message = "Device ID is required")
    private String deviceId;
}
