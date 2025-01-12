package org.enspy.snappy.server.presentation.dto.chat;

import lombok.Data;
import org.enspy.snappy.server.domain.entities.MessageAck;

import java.util.UUID;

@Data
public class UpdateMessageAckDto {
    UUID messageId;
    MessageAck newAck;
}
