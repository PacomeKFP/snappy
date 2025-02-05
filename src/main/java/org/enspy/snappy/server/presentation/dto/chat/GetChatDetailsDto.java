package org.enspy.snappy.server.presentation.dto.chat;

import lombok.Data;

@Data
public class GetChatDetailsDto {
    String user;
    String interlocutor;
}
