package org.enspy.snappy.server.presentation.dto.chat;

import java.util.UUID;
import lombok.Data;
import org.enspy.snappy.server.domain.entities.MessageAck;

@Data
public class UpdateMessageAckDto {
    UUID messageId;
    MessageAck newAck;
}
