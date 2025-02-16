package org.enspy.snappy.server.domain.usecases.chat;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import java.util.*;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.callbacks.SendMessageCallback;
import org.enspy.snappy.server.domain.entities.*;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.helpers.WebSocketHelper;
import org.enspy.snappy.server.infrastructure.repositories.ChatRepository;
import org.enspy.snappy.server.infrastructure.repositories.MessageRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.storages.ConnectedUserStorage;
import org.enspy.snappy.server.infrastructure.storages.NotSentMessagesStorage;
import org.enspy.snappy.server.presentation.dto.chat.SaveMessageAttachementDto;
import org.enspy.snappy.server.presentation.dto.chat.SendMessageDto;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Log4j2
public class SendMessageUseCase implements UseCase<SendMessageDto, Message> {

  private final UserRepository userRepository;
  private final ChatRepository chatRepository;
  private final SocketIOServer socketIOServer;
  private final MessageRepository messageRepository;
  private final ConnectedUserStorage connectedUserStorage;
  private final NotSentMessagesStorage notSentMessagesStorage;
  private final SaveMessageAttachementUseCase saveMessageAttachementUseCase;

  public SendMessageUseCase(
      UserRepository userRepository,
      ChatRepository chatRepository,
      SocketIOServer socketIOServer,
      MessageRepository messageRepository,
      ConnectedUserStorage connectedUserStorage,
      NotSentMessagesStorage notSentMessagesStorage,
      SaveMessageAttachementUseCase saveMessageAttachementUseCase) {
    this.userRepository = userRepository;
    this.chatRepository = chatRepository;
    this.socketIOServer = socketIOServer;
    this.messageRepository = messageRepository;
    this.connectedUserStorage = connectedUserStorage;
    this.notSentMessagesStorage = notSentMessagesStorage;
    this.saveMessageAttachementUseCase = saveMessageAttachementUseCase;
  }

  @Override
  public Message execute(SendMessageDto dto) {
    log.info("Starting message sending process for project: {}", dto.getProjectId());

    Optional<User> sender =
        userRepository.findByExternalIdAndProjectId(dto.getSenderId(), dto.getProjectId());
    if (sender.isEmpty()) {
      log.error(
          "Sender not found - senderId: {}, projectId: {}", dto.getSenderId(), dto.getProjectId());
      throw new IllegalArgumentException("Sender not found");
    }
    log.debug("Sender found: {}", sender.get().getId());

    Optional<User> receiver =
        userRepository.findByExternalIdAndProjectId(dto.getReceiverId(), dto.getProjectId());
    if (receiver.isEmpty()) {
      log.error(
          "Receiver not found - receiverId: {}, projectId: {}",
          dto.getReceiverId(),
          dto.getProjectId());
      throw new IllegalArgumentException("Receiver not found");
    }
    log.debug("Receiver found: {}", receiver.get().getId());

    final Message message = persistMessage(dto, sender, receiver);

    this.saveMessageAttachements(dto, message);
    this.sendMessageToReceiver(message);
    this.sendMessageToSender(message);
    this.sendMessageToAlan(message);

    log.info("Message sending process completed");
    return message;
  }

  private void sendMessageToAlan(Message message) {
    Optional<Chat> chat =
        chatRepository.findByProjectIdAndReceiverAndSender(
            message.getProjectId(),
            message.getReceiver().getExternalId(),
            message.getSender().getExternalId());
    if (chat.isEmpty()) return;
    MessagingMode receiversMessagingMode = chat.get().getMode();
    if (receiversMessagingMode == MessagingMode.OFF) return;

    int mode = 0;
    if (receiversMessagingMode == MessagingMode.ON) mode = 1;

    // Envoi de la requête HTTP POST
    String url = "http://localhost:8002?mode=" + mode;
    RestTemplate restTemplate = new RestTemplate();
    Object response = restTemplate.postForObject(url, message, Object.class);
    log.info("the response is here" + response);
  }

  private @NotNull Message persistMessage(
      SendMessageDto dto, Optional<User> sender, Optional<User> receiver) {
    assert sender.isPresent() && receiver.isPresent();
    Message message = new Message();
    message.setSender(sender.get());
    message.setReceiver(receiver.get());
    message.setBody(dto.getBody());
    message.setProjectId(dto.getProjectId());

    message = messageRepository.save(message);
    log.info("Message saved with id: {}", message.getId());
    return message;
  }

  private void saveMessageAttachements(SendMessageDto dto, Message message) {
    if (dto.getAttachements() != null && !dto.getAttachements().isEmpty()) {
      List<MessageAttachement> messageAttachements =
          saveMessageAttachementUseCase.execute(
              new SaveMessageAttachementDto(message, dto.getAttachements()));
      message.setMessageAttachements(messageAttachements);
    }
  }

  public void sendMessageToReceiver(@NotNull Message message) {
    String receiverId = message.getReceiver().getId().toString();
    String receiverSession = connectedUserStorage.getConnectedUserSessionId(receiverId);

    if (receiverSession != null) {
      log.warn("Receiver is connected. Session: {}", receiverSession);
      SocketIOClient receiver = socketIOServer.getClient(UUID.fromString(receiverSession));
      receiver.sendEvent(
          WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER, new SendMessageCallback(), message);
      log.info("Message sent to receiver. UserId: {}", receiverId);
    } else {
      log.warn("Receiver is offline. Adding to unread messages. UserId: {}", receiverId);
      notSentMessagesStorage.addNotSentMessageForUser(receiverId, message);
    }
  }

  public void sendMessageToSender(@NotNull Message message) {
    String senderId = message.getSender().getId().toString();
    String senderSession = connectedUserStorage.getConnectedUserSessionId(senderId);

    if (senderSession != null) {
      log.debug("Sender is connected. Session: {}", senderSession);
      SocketIOClient sender = socketIOServer.getClient(UUID.fromString(senderSession));
      sender.sendEvent(
          WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER, new SendMessageCallback(), message);
      log.info("Message sent to sender. UserId: {}", senderId);
    } else {
      log.warn("Sender is offline. UserId: {}", senderId);
    }
  }
}
