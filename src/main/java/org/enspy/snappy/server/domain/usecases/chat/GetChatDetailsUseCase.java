package org.enspy.snappy.server.domain.usecases.chat;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.enspy.snappy.server.domain.entities.Message;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.MessageRepository;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.chat.GetChatDetailsDto;
import org.enspy.snappy.server.presentation.resources.ChatDetailsResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetChatDetailsUseCase implements UseCase<GetChatDetailsDto, ChatDetailsResource> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public ChatDetailsResource execute(GetChatDetailsDto userId) {
        // Find the users involved in the chat
        Optional<User> user = userRepository.findById(UUID.fromString(userId.getUser()));
        Optional<User> interlocutor = userRepository.findById(UUID.fromString(userId.getInterlocutor()));

        if (user.isEmpty() || interlocutor.isEmpty()) {
            throw new IllegalArgumentException("User or interlocutor not found");
        }

        // Fetch messages exchanged between the two users using a repository query
        List<Message> messages = messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
                UUID.fromString(userId.getUser()), UUID.fromString(userId.getInterlocutor()),
                UUID.fromString(userId.getInterlocutor()), UUID.fromString(userId.getUser())
        );

        // Transform messages into ChatDetailsResource objects
        ChatDetailsResource resource = new ChatDetailsResource();
        resource.setUser(interlocutor.get()); // Set the interlocutor
        resource.setMessages(messages); // Set the message details
        return resource;
    }
}