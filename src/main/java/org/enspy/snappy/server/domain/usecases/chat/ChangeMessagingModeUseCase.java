package org.enspy.snappy.server.domain.usecases.chat;

import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.repositories.UserRepository;
import org.enspy.snappy.server.presentation.dto.chat.ChangeMessagingModeDto;
import org.enspy.snappy.server.domain.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChangeMessagingModeUseCase implements UseCase<ChangeMessagingModeDto, Void> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Void execute(ChangeMessagingModeDto dto) {
        // Validate input DTO fields are not null or blank
        if (dto.getRequesterId() == null || dto.getRequesterId().isBlank() ||
                dto.getInterlocutorId() == null || dto.getInterlocutorId().isBlank() ||
                dto.getTargetMode() == null || dto.getProjectId() == null || dto.getProjectId().isBlank()) {
            throw new IllegalArgumentException("Invalid input: All fields are required");
        }

        // Check if requester exists
        User requester = userRepository.findByExternalIdAndProjectId(dto.getRequesterId(), dto.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("Requester not found"));

        // Check if interlocutor exists
        User interlocutor = userRepository.findByExternalIdAndProjectId(dto.getInterlocutorId(), dto.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("Interlocutor not found"));

         // TODO:  Save the messaging mode
         // ISSUE: Etant donné qu'il n'y a plus l'entité conversation,
         // alors le stockage des etats de conversation devient compliqué

        return null;
    }
}
