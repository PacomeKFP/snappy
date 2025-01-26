package org.enspy.snappy.server.presentation.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FindUserByDisplayNameDto {
    private String displayName;
    @NotNull
    @NotBlank
    private String projectId;
}
