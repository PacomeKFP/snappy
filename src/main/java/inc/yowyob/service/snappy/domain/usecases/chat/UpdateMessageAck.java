package inc.yowyob.service.snappy.domain.usecases.chat;

import inc.yowyob.service.snappy.domain.entities.Message;
import inc.yowyob.service.snappy.domain.exceptions.EntityNotFoundException;
import inc.yowyob.service.snappy.domain.exceptions.IllegalStateTransitionException;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.MessageRepository;
import inc.yowyob.service.snappy.presentation.dto.chat.UpdateMessageAckDto;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UpdateMessageAck implements UseCase<UpdateMessageAckDto, Message> {

  private final MessageRepository messageRepository;

  public UpdateMessageAck(MessageRepository messageRepository) {
    this.messageRepository = messageRepository;
  }

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
