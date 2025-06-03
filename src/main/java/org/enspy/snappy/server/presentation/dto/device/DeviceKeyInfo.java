package org.enspy.snappy.server.presentation.dto.device;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeDeserializer;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeSerializer;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceKeyInfo {
    private String deviceId;
    private String deviceName;
    private String deviceType; // Assuming DeviceType.name() will be used
    private byte[] devicePublicKey;
    private String keyAlgorithm;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime lastActive;
}
