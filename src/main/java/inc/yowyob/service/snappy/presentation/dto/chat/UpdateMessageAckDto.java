package inc.yowyob.service.snappy.presentation.dto.chat;

import inc.yowyob.service.snappy.domain.entities.MessageAck;
import java.util.UUID;
import lombok.Data;

@Data
public class UpdateMessageAckDto {
  UUID messageId;
  MessageAck newAck;
}
