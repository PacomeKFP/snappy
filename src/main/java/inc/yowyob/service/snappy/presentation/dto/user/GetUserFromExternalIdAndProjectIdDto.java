package inc.yowyob.service.snappy.presentation.dto.user;

import lombok.Data;

@Data
public class GetUserFromExternalIdAndProjectIdDto {
  private String userExternalId;
  private String projectId;
}
