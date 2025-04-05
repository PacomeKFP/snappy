package org.enspy.snappy.server.domain.usecases.chat;

import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.repositories.MessageRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.chat.GetChatDetailsDto;
import org.enspy.snappy.server.presentation.resources.ChatDetailsResource;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class GetChatDetailsUseCase implements MonoUseCase<GetChatDetailsDto, ChatDetailsResource> {

  private final UserRepository userRepository;
  private final MessageRepository messageRepository;

  public GetChatDetailsUseCase(UserRepository userRepository, MessageRepository messageRepository) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
  }

  @Override
  public Mono<ChatDetailsResource> execute(GetChatDetailsDto dto) {
    if (dto == null || dto.getUser() == null || dto.getInterlocutor() == null || dto.getProjectId() ==null) {
      return Mono.error(
          new IllegalArgumentException("Les identifiants des utilisateurs sont requis"));
    }


    // Définir l'interlocuteur
    // Récupérer les messages entre les deux utilisateurs

    return Mono.zip(
            userRepository
                .findByExternalIdAndProjectId(dto.getUser(), dto.getProjectId())
                .switchIfEmpty(Mono.error(new IllegalArgumentException("Utilisateur non trouvé"))),
            userRepository
                .findByExternalIdAndProjectId(dto.getInterlocutor(), dto.getProjectId())
                .switchIfEmpty(
                    Mono.error(new IllegalArgumentException("Interlocuteur non trouvé"))))
        .flatMap(
            tuple -> {
              ChatDetailsResource chatResource = new ChatDetailsResource();
              chatResource.setUser(tuple.getT2()); // Définir l'interlocuteur

              // Récupérer les messages entre les deux utilisateurs
              return messageRepository
                  .findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
                      tuple.getT1().getId(), tuple.getT2().getId(), tuple.getT2().getId(), tuple.getT1().getId())
                  .collectList()
                  .doOnNext(chatResource::setMessages)
                  .thenReturn(chatResource);
            });
  }
}
