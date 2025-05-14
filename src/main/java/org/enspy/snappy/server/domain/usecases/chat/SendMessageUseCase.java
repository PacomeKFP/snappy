package org.enspy.snappy.server.domain.usecases.chat;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import java.util.UUID;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.callbacks.SendMessageCallback;
import org.enspy.snappy.server.domain.entities.*;
import org.enspy.snappy.server.domain.usecases.MonoUseCase;
import org.enspy.snappy.server.infrastructure.helpers.WebSocketHelper;
import org.enspy.snappy.server.infrastructure.repositories.ChatRepository;
import org.enspy.snappy.server.infrastructure.repositories.MessageRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.infrastructure.storages.ConnectedUserStorage;
import org.enspy.snappy.server.infrastructure.storages.NotSentMessagesStorage;
import org.enspy.snappy.server.presentation.dto.chat.SaveMessageAttachementDto;
import org.enspy.snappy.server.presentation.dto.chat.SendMessageDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Log4j2
public class SendMessageUseCase implements MonoUseCase<SendMessageDto, Message> {

  @Value("${alan.baseurl}")
  private String alanBaseUrl;

  @Value("${alan.endpoint.send-message}")
  private String alanEndpointSendMessage;

  private final WebClient webClient;
  private final UserRepository userRepository;
  private final ChatRepository chatRepository;
  private final SocketIOServer socketIOServer;
  private final MessageRepository messageRepository;
  private final ConnectedUserStorage connectedUserStorage;
  private final NotSentMessagesStorage notSentMessagesStorage;
  private final SaveMessageAttachementUseCase saveMessageAttachementUseCase;

  public SendMessageUseCase(
      WebClient webClient,
      UserRepository userRepository,
      ChatRepository chatRepository,
      SocketIOServer socketIOServer,
      MessageRepository messageRepository,
      ConnectedUserStorage connectedUserStorage,
      NotSentMessagesStorage notSentMessagesStorage,
      SaveMessageAttachementUseCase saveMessageAttachementUseCase) {
    this.webClient = webClient;
    this.userRepository = userRepository;
    this.chatRepository = chatRepository;
    this.socketIOServer = socketIOServer;
    this.messageRepository = messageRepository;
    this.connectedUserStorage = connectedUserStorage;
    this.notSentMessagesStorage = notSentMessagesStorage;
    this.saveMessageAttachementUseCase = saveMessageAttachementUseCase;
  }

  @Override
  /*public Mono<Message> execute(SendMessageDto dto) {
    if (dto == null
        || dto.getSenderId() == null
        || dto.getReceiverId() == null
        || dto.getProjectId() == null) {
      return Mono.error(
          new IllegalArgumentException(
              "Les informations d'expéditeur et de destinataire sont requises"));
    }

    log.info("Début du processus d'envoi de message pour le projet: {}", dto.getProjectId());

    Mono<User> senderMono =
        userRepository
            .findByExternalIdAndProjectId(dto.getSenderId(), dto.getProjectId())
            .switchIfEmpty(Mono.error(new IllegalArgumentException("Expéditeur non trouvé")))
            .doOnNext(sender -> log.debug("Expéditeur trouvé: {}", sender.getId()));

    Mono<User> receiverMono =
        userRepository
            .findByExternalIdAndProjectId(dto.getReceiverId(), dto.getProjectId())
            .switchIfEmpty(Mono.error(new IllegalArgumentException("Destinataire non trouvé")))
            .doOnNext(receiver -> log.debug("Destinataire trouvé: {}", receiver.getId()));

    return Mono.zip(senderMono, receiverMono)
        .flatMap(
            tuple -> {
              User sender = tuple.getT1();
              User receiver = tuple.getT2();

              Message message = new Message();
              message.setSender(sender);
              message.setReceiver(receiver);
              message.setBody(dto.getBody());
              message.setProjectId(dto.getProjectId());

              return messageRepository.save(message);
            })
        .doOnNext(message -> log.info("Message sauvegardé avec ID: {}", message.getId()))
        .flatMap(
            message -> {
              if (dto.getAttachements() != null && !dto.getAttachements().isEmpty()) {
                return saveMessageAttachementUseCase
                    .execute(new SaveMessageAttachementDto(message, dto.getAttachements()))
                    .collectList()
                    .doOnNext(message::setMessageAttachements)
                    .thenReturn(message);
              }
              return Mono.just(message);
            })
        .flatMap(
            message ->
                sendMessageToReceiver(message)
                    .then(sendMessageToSender(message))
//                    .then(sendMessageToAlan(message))
                    .thenReturn(message))
        .doOnNext(message -> log.info("Processus d'envoi de message terminé"));
  }*/

 // Nouveau 

 
public Mono<Message> execute(SendMessageDto dto) {
   
    if (dto.getReceiverIds() != null && !dto.getReceiverIds().isEmpty()) {
        return sendMessageToMultipleUsers(dto);
    }
    
   
    return sendMessageToSingleUser(dto);
}


private Mono<Message> sendMessageToSingleUser(SendMessageDto dto) {
   
    Message message = new Message();
    message.setId(UUID.randomUUID().toString());
    message.setSenderId(dto.getSenderId());
    message.setReceiverId(dto.getReceiverId());
    message.setContent(dto.getContent());
    message.setTimestamp(LocalDateTime.now());
    message.setType(dto.getType());
    
    
    return messageRepository.save(message)
            .flatMap(savedMessage -> {
                String receiverId = savedMessage.getReceiverId();
                
                
                if (connectedUserStorage.isUserConnected(receiverId)) {
                    
                    List<WebSocketSession> receiverSessions = connectedUserStorage.getUserSessions(receiverId);
                    
                   
                    String messageJson = jsonFieldService.toJson(savedMessage);
                    
                    return Flux.fromIterable(receiverSessions)
                            .flatMap(session -> {
                                return session.send(Mono.just(session.textMessage(messageJson)))
                                        .onErrorResume(e -> {
                                            log.error("Error sending message to session: {}", e.getMessage());
                                            return Mono.empty();
                                        });
                            })
                            .then(Mono.just(savedMessage))
                            .doOnSuccess(msg -> {
                                
                                if (!receiverSessions.isEmpty()) {
                                   
                                    notSentMessagesStorage.addNotSentMessage(savedMessage);
                                }
                            });
                } else {
                    
                    notSentMessagesStorage.addNotSentMessage(savedMessage);
                    return Mono.just(savedMessage);
                }
            });
}


private Mono<Message> sendMessageToMultipleUsers(SendMessageDto dto) {
    
    Message message = new Message();
    message.setId(UUID.randomUUID().toString());
    message.setSenderId(dto.getSenderId());
    message.setContent(dto.getContent());
    message.setTimestamp(LocalDateTime.now());
    message.setType(dto.getType());
    
    
    
    List<String> receiverIds = dto.getReceiverIds();
    
    
    return Flux.fromIterable(receiverIds)
            .flatMap(receiverId -> {
               
                Message messageCopy = new Message();
                BeanUtils.copyProperties(message, messageCopy);
                messageCopy.setId(UUID.randomUUID().toString()); // ID unique pour chaque copie
                messageCopy.setReceiverId(receiverId);
                
                
                return messageRepository.save(messageCopy)
                        .flatMap(savedMessage -> {
                            
                            if (connectedUserStorage.isUserConnected(receiverId)) {
                               
                                List<WebSocketSession> receiverSessions = connectedUserStorage.getUserSessions(receiverId);
                                
                               
                                String messageJson = jsonFieldService.toJson(savedMessage);
                                
                                return Flux.fromIterable(receiverSessions)
                                        .flatMap(session -> {
                                            return session.send(Mono.just(session.textMessage(messageJson)))
                                                    .onErrorResume(e -> Mono.empty());
                                        })
                                        .then(Mono.just(savedMessage))
                                        .doOnSuccess(msg -> {
                                          
                                            notSentMessagesStorage.addNotSentMessage(savedMessage);
                                        });
                            } else {
                            
                                notSentMessagesStorage.addNotSentMessage(savedMessage);
                                return Mono.just(savedMessage);
                            }
                        });
            })
            .collectList()
            .then(Mono.just(message)); 
}

  private Mono<Void> sendMessageToAlan(Message message) {
    return chatRepository
        .findByProjectIdAndReceiverAndSender(
            message.getProjectId(),
            message.getReceiver().getExternalId(),
            message.getSender().getExternalId())
        .flatMap(
            chat -> {
              MessagingMode receiversMessagingMode = chat.getMode();
              if (receiversMessagingMode == MessagingMode.OFF) {
                return Mono.empty();
              }

              int mode = receiversMessagingMode == MessagingMode.ON ? 1 : 0;
              String url = alanBaseUrl + alanEndpointSendMessage + mode;
              log.debug("URL Alan: " + url);

              return webClient
                  .post()
                  .uri(url)
                  .bodyValue(message)
                  .retrieve()
                  .bodyToMono(Object.class)
                  .doOnNext(response -> log.info("Réponse reçue: {}", response))
                  .doOnError(error -> log.error("Erreur lors de l'envoi à Alan", error));
            })
        .then();
  }

  private Mono<Void> sendMessageToReceiver(Message message) {
    String receiverId = message.getReceiver().getId().toString();

    return connectedUserStorage
        .getConnectedUserSessionId(receiverId)
        .flatMap(
            receiverSession -> {
              log.debug("Destinataire connecté. Session: {}", receiverSession);
              SocketIOClient receiver = socketIOServer.getClient(UUID.fromString(receiverSession));

              if (receiver != null) {
                receiver.sendEvent(
                    WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER,
                    new SendMessageCallback(),
                    message);
                log.info("Message envoyé au destinataire. UserId: {}", receiverId);
                return Mono.empty();
              } else {
                log.warn("Session du destinataire invalide. UserId: {}", receiverId);
                return addNotSentMessage(receiverId, message);
              }
            })
        .switchIfEmpty(
            Mono.defer(
                () -> {
                  log.warn(
                      "Destinataire hors ligne. Ajout aux messages non lus. UserId: {}",
                      receiverId);
                  return addNotSentMessage(receiverId, message);
                }));
  }

  private Mono<Void> sendMessageToSender(Message message) {
    String senderId = message.getSender().getId().toString();

    connectedUserStorage
        .getConnectedUserSessionId(senderId)
        .flatMap(
            senderSession -> {
              log.debug("Expéditeur connecté. Session: {}", senderSession);
              SocketIOClient sender = socketIOServer.getClient(UUID.fromString(senderSession));

              if (sender != null) {
                sender.sendEvent(
                    WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER,
                    new SendMessageCallback(),
                    message);
                log.info("Message envoyé à l'expéditeur. UserId: {}", senderId);
              } else {
                log.warn("Session de l'expéditeur invalide. UserId: {}", senderId);
              }
              return Mono.empty();
            })
        .switchIfEmpty(
            Mono.defer(
                () -> {
                  log.warn("Expéditeur hors ligne. UserId: {}", senderId);
                  return Mono.empty();
                }));
    return Mono.empty();
  }

  private Mono<Void> addNotSentMessage(String userId, Message message) {
    return Mono.fromRunnable(
        () -> notSentMessagesStorage.addNotSentMessageForUser(userId, message));
  }
}
