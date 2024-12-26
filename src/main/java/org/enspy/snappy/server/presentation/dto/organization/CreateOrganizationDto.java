package org.enspy.snappy.server.presentation.dto.organization;

import lombok.Data;
import org.enspy.snappy.server.domain.entities.Organization;
import org.enspy.snappy.server.domain.usecases.UseCase;

@Data
public class CreateOrganizationDto {

    private String name;
    private String email;
    private String password;
}
