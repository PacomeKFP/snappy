package org.enspy.snappy.server.presentation.dto.chat;

import lombok.Data;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.MessagingMode;
import org.enspy.snappy.server.domain.usecases.UseCase;

import java.util.UUID;

@Data
public class SendMessageDto  {
    private String projectId;
    private String body;
    private boolean isWrittenByHuman;
    private MessagingMode mode;
    private UUID author;
    private UUID to;
}
