package org.enspy.snappy.server.domain.usecases.chat;

import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.chat.GetChatDetailsDto;
import org.enspy.snappy.server.presentation.resources.ChatDetailsResource;

import java.util.List;

public class GetChatDetails implements UseCase<GetChatDetailsDto, List<ChatDetailsResource>> {
    @Override
    public List<ChatDetailsResource> execute(GetChatDetailsDto dto) {
        return List.of();
    }
}
