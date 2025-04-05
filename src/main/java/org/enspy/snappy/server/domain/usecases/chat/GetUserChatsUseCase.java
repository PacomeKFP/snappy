package org.enspy.snappy.server.domain.usecases.chat;

import java.util.Comparator;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.FluxUseCase;
import org.enspy.snappy.server.infrastructure.repositories.MessageRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;
import org.enspy.snappy.server.presentation.resources.ChatResource;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class GetUserChatsUseCase implements FluxUseCase<GetUserChatsDto, ChatResource> {

  private final UserRepository userRepository;
  private final MessageRepository messageRepository;

  public GetUserChatsUseCase(UserRepository userRepository, MessageRepository messageRepository) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
  }

  @Override
  public Flux<ChatResource> execute(GetUserChatsDto dto) {
    if (dto == null || dto.getExternalUserId() == null || dto.getProjectId() == null) {
      return Flux.error(
          new IllegalArgumentException("Les identifiants utilisateur et projet sont requis"));
    }

    return userRepository
        .findByExternalIdAndProjectId(dto.getExternalUserId(), dto.getProjectId())
        .switchIfEmpty(Mono.error(new IllegalArgumentException("Utilisateur non trouvé")))
        .flatMapMany(
            user ->
                messageRepository
                    .findBySenderIdOrReceiverId(user.getId(), user.getId())
                    // Groupe par interlocuteur
                    .groupBy(
                        message ->
                            message.getSender().getId().equals(user.getId())
                                ? message.getReceiver().getId()
                                : message.getSender().getId())
                    // Pour chaque groupe, trouve le dernier message et l'interlocuteur
                    .flatMap(
                        group ->
                            group
                                .collectList()
                                .flatMap(
                                    messages -> {
                                      // Trouver le dernier message
                                      Message lastMessage =
                                          messages.stream()
                                              .max(Comparator.comparing(Message::getCreatedAt))
                                              .orElse(null);

                                      // Déterminer l'interlocuteur
                                      User interlocutor =
                                          lastMessage.getSender().getId().equals(user.getId())
                                              ? lastMessage.getReceiver()
                                              : lastMessage.getSender();

                                      ChatResource resource = new ChatResource();
                                      resource.setUser(interlocutor);
                                      resource.setLastMessage(lastMessage);

                                      return Mono.just(resource);
                                    })));
  }
}
