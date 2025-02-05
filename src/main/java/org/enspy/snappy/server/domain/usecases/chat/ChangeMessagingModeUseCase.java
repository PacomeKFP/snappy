package org.enspy.snappy.server.domain.usecases.chat;

import java.util.Optional;
import org.enspy.snappy.server.domain.entities.Chat;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.ChatRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.chat.ChangeMessagingModeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChangeMessagingModeUseCase implements UseCase<ChangeMessagingModeDto, Chat> {

  @Autowired private UserRepository userRepository;

  @Autowired private ChatRepository chatRepository;

  @Override
  public Chat execute(ChangeMessagingModeDto dto) {
    if (dto.getRequesterId() == null
        || dto.getRequesterId().isBlank()
        || dto.getInterlocutorId() == null
        || dto.getInterlocutorId().isBlank()
        || dto.getTargetMode() == null
        || dto.getProjectId() == null
        || dto.getProjectId().isBlank()) {
      throw new IllegalArgumentException("Invalid input: All fields are required");
    }

    userRepository
        .findByExternalIdAndProjectId(dto.getRequesterId(), dto.getProjectId())
        .orElseThrow(() -> new IllegalArgumentException("Requester not found"));

    userRepository
        .findByExternalIdAndProjectId(dto.getInterlocutorId(), dto.getProjectId())
        .orElseThrow(() -> new IllegalArgumentException("Interlocutor not found"));

    Optional<Chat> chat =
        chatRepository.findByProjectIdAndReceiverAndSender(
            dto.getProjectId(), dto.getRequesterId(), dto.getInterlocutorId());

    chat.ifPresent(
        value -> {
          value.setMode(dto.getTargetMode());
          chatRepository.save(value);
        });

    if (chat.isEmpty()) {
      Chat newChat = new Chat();
      newChat.setProjectId(dto.getProjectId());
      newChat.setReceiver(dto.getRequesterId());
      newChat.setSender(dto.getInterlocutorId());
      newChat.setMode(dto.getTargetMode());
      return chatRepository.save(newChat);
    }
    return chat.get();
  }
}
