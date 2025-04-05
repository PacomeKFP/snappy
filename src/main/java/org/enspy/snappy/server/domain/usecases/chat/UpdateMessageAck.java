package org.enspy.snappy.server.domain.usecases.chat;

      import org.enspy.snappy.server.domain.entities.Message;
      import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
      import org.enspy.snappy.server.domain.exceptions.IllegalStateTransitionException;
      import org.enspy.snappy.server.domain.usecases.MonoUseCase;
      import org.enspy.snappy.server.infrastructure.repositories.MessageRepository;
      import org.enspy.snappy.server.presentation.dto.chat.UpdateMessageAckDto;
      import org.springframework.stereotype.Service;
      import reactor.core.publisher.Mono;

      @Service
      public class UpdateMessageAck implements MonoUseCase<UpdateMessageAckDto, Message> {

          private final MessageRepository messageRepository;

          public UpdateMessageAck(MessageRepository messageRepository) {
              this.messageRepository = messageRepository;
          }

          @Override
          public Mono<Message> execute(UpdateMessageAckDto dto) {
              if (dto == null || dto.getMessageId() == null || dto.getNewAck() == null) {
                  return Mono.error(new IllegalArgumentException("ID du message et nouvel ACK sont requis"));
              }

              return messageRepository.findById(dto.getMessageId())
                  .switchIfEmpty(Mono.error(new EntityNotFoundException(
                      "Message cible non trouvé; impossible de changer son ack")))
                  .flatMap(message -> {
                      if (message.getAck().ordinal() + 1 == dto.getNewAck().ordinal()) {
                          message.setAck(dto.getNewAck());
                          return messageRepository.save(message);
                      } else {
                          return Mono.error(new IllegalStateTransitionException(
                              "Impossible de changer un ack de " + message.getAck() + " à " + dto.getNewAck()));
                      }
                  });
          }
      }