package org.enspy.snappy.server.presentation.dto.chat.response;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetChatDetailsResponse {
    private ChatUserData userData;
    private List<MessageResponse> messages;
}
