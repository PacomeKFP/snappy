package org.enspy.snappy.server.presentation.dto.user;

import lombok.Data;

@Data
public class GetUserFromExternalIdAndProjectIdDto {
  private String userExternalId;
  private String projectId;
}
