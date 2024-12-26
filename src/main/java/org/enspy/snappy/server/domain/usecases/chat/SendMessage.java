package org.enspy.snappy.server.domain.usecases.chat;

import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.usecases.UseCase;

public class SendMessage implements UseCase<Message, Message> {
    @Override
    public Message execute(Message dto) {
        return null;
    }
}
