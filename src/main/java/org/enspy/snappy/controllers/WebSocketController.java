package org.enspy.snappy.controllers;


import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.controllers.dto.CreateMessageDto;
import org.enspy.snappy.helpers.WebSocketAcknowledges;
import org.enspy.snappy.helpers.WebSocketHelper;
import org.enspy.snappy.models.Conversation;
import org.enspy.snappy.models.Message;
import org.enspy.snappy.repositories.ConversationRepository;
import org.enspy.snappy.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;


@Component
@Log4j2
public class WebSocketController {

    @Autowired
    private SocketIOServer socketServer;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private MessageService messageService;

    /**
     * [UserUUID]: [sessionId]
     */
    @Autowired
    private Map<String, String> connectedUsers; // <session>: <User>

    WebSocketController(SocketIOServer socketServer) {
        this.socketServer = socketServer;

        log.info("Connected Users " + connectedUsers);
        this.socketServer.addEventListener(WebSocketHelper.InputEndpoints.REVEICE_MESSAGE_FROM_USER, CreateMessageDto.class, onSendMessage);

    }


    public DataListener<CreateMessageDto> onSendMessage = new DataListener<>() {
        @Override
        public void onData(SocketIOClient client, CreateMessageDto messageDto, AckRequest acknowledge) throws Exception {
            String user = client.getHandshakeData().getSingleUrlParam("user");

            // regarder les utilisateurs connectés.
            log.info("Conversation: \n" + messageDto);
//            LocalDateTime now = LocalDateTime.now();
//            Message message = new Message();

            Optional<Conversation> conversation = conversationRepository.findById(messageDto.getConversation());
            // Si la conversation n'existe pas, on arrete tout
            if (conversation.isEmpty()) {
                acknowledge.sendAckData(WebSocketAcknowledges.CONVERSATION_NOT_FOUND);
                return;
            }
            // Sauvegarder le message et l'envoyer aux membres connectés de la conversation
            Message message = messageService.createMessage(messageDto);
            conversation.get().getUsers().forEach((userInConversation) -> {
                String userSession = connectedUsers.get(userInConversation.toString());
                if (userSession != null && !userSession.equals(user)) {
                    socketServer.getClient(UUID.fromString(userSession)).sendEvent(WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER, message);
                }
            });
            acknowledge.sendAckData("SENT");
        }
    };

}