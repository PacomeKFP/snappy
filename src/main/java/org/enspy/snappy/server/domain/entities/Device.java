package org.enspy.snappy.server.domain.entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeDeserializer;
import org.enspy.snappy.server.infrastructure.helpers.LocalDateTimeSerializer;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("devices")
public class Device {
    @Id
    private UUID id;
    
    @Column("user_id")
    private String userId;
    
    @Column("device_id")
    private String deviceId;
    
    @Column("device_type")
    private String deviceType;
    
    @Column("last_active")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime lastActive;
    
    @Column("device_name")
    private String deviceName;
    
    @Column("fcm_token")
    private String fcmToken; // Pour les notifications push (optionnel)
    
    @CreatedDate
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @Column("created_at")
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @Column("updated_at")
    private LocalDateTime updatedAt;
    
    // Méthode utilitaire pour définir le type d'appareil comme enum
    public void setDeviceType(DeviceType type) {
        this.deviceType = type.name();
    }
    
    // Méthode utilitaire pour récupérer le type d'appareil comme enum
    public DeviceType getDeviceType() {
        return deviceType != null ? DeviceType.valueOf(deviceType) : null;
    }
}