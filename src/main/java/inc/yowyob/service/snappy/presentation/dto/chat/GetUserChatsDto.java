package inc.yowyob.service.snappy.presentation.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetUserChatsDto {
  String externalUserId;
  String projectId;
}
