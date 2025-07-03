package inc.yowyob.service.snappy.domain.usecases.chat;

import inc.yowyob.service.snappy.domain.entities.Chat;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.ChatRepository;
import inc.yowyob.service.snappy.infrastructure.repositories.UserRepository;
import inc.yowyob.service.snappy.presentation.dto.chat.ChangeMessagingModeDto;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class ChangeMessagingModeUseCase implements UseCase<ChangeMessagingModeDto, Chat> {

  private final UserRepository userRepository;
  private final ChatRepository chatRepository;

  public ChangeMessagingModeUseCase(UserRepository userRepository, ChatRepository chatRepository) {
    this.userRepository = userRepository;
    this.chatRepository = chatRepository;
  }

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
