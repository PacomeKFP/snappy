package org.enspy.snappy.controllers.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class CreateConversationDto {
    private List<String> users;
}
