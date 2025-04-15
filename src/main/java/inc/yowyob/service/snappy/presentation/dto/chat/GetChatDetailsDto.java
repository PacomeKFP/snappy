package inc.yowyob.service.snappy.presentation.dto.chat;

import lombok.Data;

@Data
public class GetChatDetailsDto {
  String user;
  String interlocutor;
  String projectId;
}
