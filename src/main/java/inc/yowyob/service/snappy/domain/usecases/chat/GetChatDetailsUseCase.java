package inc.yowyob.service.snappy.domain.usecases.chat;

import inc.yowyob.service.snappy.domain.entities.Message;
import inc.yowyob.service.snappy.domain.entities.User;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.MessageRepository;
import inc.yowyob.service.snappy.infrastructure.repositories.UserRepository;
import inc.yowyob.service.snappy.presentation.dto.chat.GetChatDetailsDto;
import inc.yowyob.service.snappy.presentation.resources.ChatDetailsResource;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class GetChatDetailsUseCase implements UseCase<GetChatDetailsDto, ChatDetailsResource> {

  private final UserRepository userRepository;
  private final MessageRepository messageRepository;

  public GetChatDetailsUseCase(UserRepository userRepository, MessageRepository messageRepository) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
  }

  @Override
  public ChatDetailsResource execute(GetChatDetailsDto dto) {
    // Find the users involved in the chat
    User user =
        userRepository
            .findByExternalIdAndProjectId(dto.getUser(), dto.getProjectId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

    User interlocutor =
        userRepository
            .findByExternalIdAndProjectId(dto.getInterlocutor(), dto.getProjectId())
            .orElseThrow(() -> new IllegalArgumentException("Interlocutor not found"));


    // Fetch messages exchanged between the two users using a repository query
    List<Message> messages =
        messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
            UUID.fromString(user.getId()), UUID.fromString(interlocutor.getId()),
            UUID.fromString(interlocutor.getId()), UUID.fromString(user.getId()));

    // Transform messages into ChatDetailsResource objects
    ChatDetailsResource resource = new ChatDetailsResource();
    interlocutor.setOrganization = null;
    resource.setUser(interlocutor); // Set the interlocutor
    resource.setMessages(messages); // Set the message details
    return resource;
  }
}
