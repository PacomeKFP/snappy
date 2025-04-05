package inc.yowyob.service.snappy.presentation.resources;

import inc.yowyob.service.snappy.domain.entities.Message;
import inc.yowyob.service.snappy.domain.entities.User;
import lombok.Data;

@Data
public class ChatResource {
  private User user;
  private Message lastMessage;
}
