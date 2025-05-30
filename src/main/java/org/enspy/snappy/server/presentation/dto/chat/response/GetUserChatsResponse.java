package org.enspy.snappy.server.presentation.dto.chat.response;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetUserChatsResponse {
    private ChatUserData userData;
    private MessageResponse lastMessage;
}
