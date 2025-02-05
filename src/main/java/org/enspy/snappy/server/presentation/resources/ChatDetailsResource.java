package org.enspy.snappy.server.presentation.resources;

import java.util.List;
import lombok.Data;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.User;

@Data
public class ChatDetailsResource {
    private User user;
    private List<Message> messages;
}
