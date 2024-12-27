package org.enspy.snappy.server.presentation.dto.user;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class AddContactDto {

    @NotBlank
    private String requesterId; // The user adding the contact

    @NotBlank
    private String contactId; // The target contact to be added

    @NotBlank
    private String projectId; // The target contact to be added
}