package inc.yowyob.service.snappy.presentation.resources;

import inc.yowyob.service.snappy.domain.entities.Message;
import inc.yowyob.service.snappy.domain.entities.User;
import java.util.List;
import lombok.Data;

@Data
public class ChatDetailsResource {
  private User user;
  private List<Message> messages;
}
