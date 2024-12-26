package org.enspy.snappy.server.presentation.resources;

import lombok.Data;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.User;

import java.util.List;

@Data
public class ChatDetailsResource {
    private User user;
    private List<Message> messages;
}
