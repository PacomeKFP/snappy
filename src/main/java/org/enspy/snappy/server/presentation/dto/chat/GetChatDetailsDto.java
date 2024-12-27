package org.enspy.snappy.server.presentation.dto.chat;

import lombok.Data;

import java.util.UUID;

@Data
public class GetChatDetailsDto {
    String user;
    String interlocutor;
}
