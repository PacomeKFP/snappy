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
  public ChatDetailsResource execute(GetChatDetailsDto userId) {
    // Find the users involved in the chat
    Optional<User> user = userRepository.findById(UUID.fromString(userId.getUser()));
    Optional<User> interlocutor =
        userRepository.findById(UUID.fromString(userId.getInterlocutor()));

    if (user.isEmpty() || interlocutor.isEmpty()) {
      throw new IllegalArgumentException("User or interlocutor not found");
    }

    // Fetch messages exchanged between the two users using a repository query
    List<Message> messages =
        messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
            UUID.fromString(userId.getUser()), UUID.fromString(userId.getInterlocutor()),
            UUID.fromString(userId.getInterlocutor()), UUID.fromString(userId.getUser()));

    // Transform messages into ChatDetailsResource objects
    ChatDetailsResource resource = new ChatDetailsResource();
    resource.setUser(interlocutor.get()); // Set the interlocutor
    resource.setMessages(messages); // Set the message details
    return resource;
  }
}
