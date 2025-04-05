package inc.yowyob.service.snappy.domain.usecases.chat;

import inc.yowyob.service.snappy.domain.entities.Message;
import inc.yowyob.service.snappy.domain.entities.User;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.MessageRepository;
import inc.yowyob.service.snappy.infrastructure.repositories.UserRepository;
import inc.yowyob.service.snappy.presentation.dto.chat.GetUserChatsDto;
import inc.yowyob.service.snappy.presentation.resources.ChatResource;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class GetUserChatsUseCase implements UseCase<GetUserChatsDto, List<ChatResource>> {

  private final UserRepository userRepository;
  private final MessageRepository messageRepository;

  public GetUserChatsUseCase(UserRepository userRepository, MessageRepository messageRepository) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
  }

  @Override
  public List<ChatResource> execute(GetUserChatsDto dto) {
    // Step 1: Retrieve the user
    User user =
        userRepository
            .findByExternalIdAndProjectId(dto.getExternalUserId(), dto.getProjectId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

    // Step 2: Fetch all messages where the user is either the sender or receiver
    List<Message> messages =
        messageRepository.findBySenderIdOrReceiverId(user.getId(), user.getId());

    // Step 3: Group messages by the interlocutor
    Map<User, List<Message>> groupedByInterlocutor =
        messages.stream()
            .collect(
                Collectors.groupingBy(
                    message ->
                        message.getSender().equals(user)
                            ? message.getReceiver()
                            : message.getSender()));

    // Step 4: Map grouped messages into ChatResource
    List<ChatResource> chatResources =
        groupedByInterlocutor.entrySet().stream()
            .map(
                entry -> {
                  User interlocutor = entry.getKey(); // The other user in the chat
                  List<Message> chatMessages = entry.getValue();
                  Message lastMessage =
                      chatMessages.stream()
                          .max(
                              Comparator.comparing(
                                  Message::getCreatedAt)) // Find the most recent message
                          .orElse(null);

                  ChatResource chatResource = new ChatResource();
                  chatResource.setUser(interlocutor); // Set the interlocutor
                  chatResource.setLastMessage(lastMessage); // Set the last message
                  return chatResource;
                })
            .collect(Collectors.toList());

    return chatResources;
  }
}
