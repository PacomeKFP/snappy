package org.enspy.snappy.server.domain.usecases.chat;

import org.enspy.snappy.server.domain.entities.Chat;
import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.repositories.ChatRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.chat.ChangeMessagingModeDto;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ChangeMessagingModeUseCase implements MonoUseCase<ChangeMessagingModeDto, Chat> {

  private final UserRepository userRepository;
  private final ChatRepository chatRepository;

  public ChangeMessagingModeUseCase(UserRepository userRepository, ChatRepository chatRepository) {
    this.userRepository = userRepository;
    this.chatRepository = chatRepository;
  }

  @Override
  public Mono<Chat> execute(ChangeMessagingModeDto dto) {
    if (dto == null
        || dto.getRequesterId() == null
        || dto.getRequesterId().isBlank()
        || dto.getInterlocutorId() == null
        || dto.getInterlocutorId().isBlank()
        || dto.getTargetMode() == null
        || dto.getProjectId() == null
        || dto.getProjectId().isBlank()) {
      return Mono.error(
          new IllegalArgumentException("Entrée invalide: Tous les champs sont requis"));
    }

    // Vérification de l'existence des utilisateurs de façon réactive
    return Mono.zip(
            userRepository
                .findByExternalIdAndProjectId(dto.getRequesterId(), dto.getProjectId())
                .switchIfEmpty(Mono.error(new IllegalArgumentException("Demandeur non trouvé"))),
            userRepository
                .findByExternalIdAndProjectId(dto.getInterlocutorId(), dto.getProjectId())
                .switchIfEmpty(
                    Mono.error(new IllegalArgumentException("Interlocuteur non trouvé"))))
        .then(
            chatRepository
                .findByProjectIdAndReceiverAndSender(
                    dto.getProjectId(), dto.getRequesterId(), dto.getInterlocutorId())
                .flatMap(
                    existingChat -> {
                      existingChat.setMode(dto.getTargetMode());
                      return chatRepository.save(existingChat);
                    })
                .switchIfEmpty(
                    Mono.defer(
                        () -> {
                          Chat newChat = new Chat();
                          newChat.setProjectId(dto.getProjectId());
                          newChat.setReceiver(dto.getRequesterId());
                          newChat.setSender(dto.getInterlocutorId());
                          newChat.setMode(dto.getTargetMode());
                          return chatRepository.save(newChat);
                        })));
  }
}
