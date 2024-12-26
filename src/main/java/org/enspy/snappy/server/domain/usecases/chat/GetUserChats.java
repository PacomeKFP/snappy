package org.enspy.snappy.server.domain.usecases.chat;

import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.resources.ChatResource;

import java.util.UUID;

public class GetUserChats implements UseCase<UUID, ChatResource> {
    @Override
    public ChatResource execute(UUID user) {
        return null;
    }
}
