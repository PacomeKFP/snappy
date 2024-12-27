package org.enspy.snappy.server.domain.usecases.chat;

import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.MessageRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.chat.GetUserChatsDto;
import org.enspy.snappy.server.presentation.dto.chat.SendMessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SendMessageUseCase implements UseCase<SendMessageDto, Void> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public Void execute(SendMessageDto userId) {
        // Validate sender
        Optional<User> sender = userRepository.findByExternalIdAndProjectId(userId.getSenderId(), userId.getProjectId());
        if (sender.isEmpty()) {
            throw new IllegalArgumentException("Sender not found");
        }

        // Validate receiver
        Optional<User> receiver = userRepository.findByExternalIdAndProjectId(userId.getReceiverId(), userId.getProjectId());
        if (receiver.isEmpty()) {
            throw new IllegalArgumentException("Receiver not found");
        }

        // Create and save the message
        Message message = new Message();
        message.setSender(sender.get());
        message.setReceiver(receiver.get());
        message.setBody(userId.getBody());
        message.setProjectId(userId.getProjectId());

        messageRepository.save(message);

        // TODO: Broadcast the message to other users using WS

        return null;
    }
}