package org.enspy.snappy.server.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("device_registration_codes")
public class DeviceRegistrationCode {

    @Id
    private UUID id;

    @Column("user_id")
    private String userId;

    @Column("code")
    private String code;

    @Column("expires_at")
    private LocalDateTime expiresAt;

    @CreatedDate
    @Column("created_at")
    private LocalDateTime createdAt;
}
