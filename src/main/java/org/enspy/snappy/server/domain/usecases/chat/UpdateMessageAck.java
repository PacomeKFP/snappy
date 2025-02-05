package org.enspy.snappy.server.domain.usecases.chat;

import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
import org.enspy.snappy.server.domain.exceptions.IllegalStateTransitionException;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.MessageRepository;
import org.enspy.snappy.server.presentation.dto.chat.UpdateMessageAckDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UpdateMessageAck implements UseCase<UpdateMessageAckDto, Message> {

  @Autowired private MessageRepository messageRepository;

  /**
   * @param dto: The id of the message we
   * @return
   */
  @Override
  public Message execute(UpdateMessageAckDto dto) {
    Optional<Message> message = messageRepository.findById(dto.getMessageId());
    if (message.isEmpty())
      throw new EntityNotFoundException(
          "Target message not found; We are unable to change his ack");
    if (message.get().getAck().ordinal() + 1 == dto.getNewAck().ordinal()) {
      message.get().setAck(dto.getNewAck());
      messageRepository.save(message.get());
    } else {
      throw new IllegalStateTransitionException(
          "Vous ne pouvez pas changer un ack de "
              + message.get().getAck()
              + " à "
              + dto.getNewAck());
    }
    return message.get();
  }
}
