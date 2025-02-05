package org.enspy.snappy.server.presentation.resources;

import lombok.Data;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.User;

@Data
public class ChatResource {
  private User user;
  private Message lastMessage;
}
