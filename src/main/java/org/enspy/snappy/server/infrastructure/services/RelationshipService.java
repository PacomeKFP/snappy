package org.enspy.snappy.server.infrastructure.services;

import org.enspy.snappy.server.domain.entities.*;
import org.enspy.snappy.server.infrastructure.repositories.*;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
public class RelationshipService {
    private final DatabaseClient databaseClient;
    private final UserRepository userRepository;
    private final ChatbotRepository chatbotRepository;
    private final MessageRepository messageRepository;
    private final ChatbotAttachementRepository chatbotAttachementRepository;
    private final MessageAttachementRepository messageAttachementRepository;
    private final OrganizationRepository organizationRepository;

    public RelationshipService(DatabaseClient databaseClient,
                             UserRepository userRepository,
                             ChatbotRepository chatbotRepository,
                             MessageRepository messageRepository,
                             ChatbotAttachementRepository chatbotAttachementRepository,
                             MessageAttachementRepository messageAttachementRepository,
                             OrganizationRepository organizationRepository) {
        this.databaseClient = databaseClient;
        this.userRepository = userRepository;
        this.chatbotRepository = chatbotRepository;
        this.messageRepository = messageRepository;
        this.chatbotAttachementRepository = chatbotAttachementRepository;
        this.messageAttachementRepository = messageAttachementRepository;
        this.organizationRepository = organizationRepository;
    }

    // --- User relationships ---

    public Mono<User> loadUserWithContacts(User user) {
        return loadUserContacts(user).collectList()
                .map(contacts -> {
                    user.setContacts(contacts);
                    return user;
                });
    }

    public Flux<User> loadUserContacts(User user) {
        // Exemple de requête SQL pour récupérer les contacts d'un utilisateur
        return databaseClient
                .sql("SELECT u.* FROM users u " +
                     "JOIN user_contacts uc ON u.id = uc.contact_id " +
                     "WHERE uc.user_id = :userId")
                .bind("userId", user.getId())
                .map((row, metadata) -> {
                    User contact = new User();
                    contact.setId(row.get("id", UUID.class));
                    contact.setProjectId(row.get("project_id", String.class));
                    contact.setExternalId(row.get("external_id", String.class));
                    contact.setDisplayName(row.get("display_name", String.class));
                    contact.setEmail(row.get("email", String.class));
                    // Mapper les autres champs
                    return contact;
                })
                .all();
    }

    // --- Message relationships ---

    public Mono<Message> loadMessageWithRelations(Message message) {
        return Mono.just(message)
                .flatMap(m -> loadMessageSender(m)
                        .flatMap(this::loadMessageReceiver)
                        .flatMap(this::loadMessageAttachments));
    }

    public Mono<Message> loadMessageSender(Message message) {
        if (message.getSenderId() == null) {
            return Mono.just(message);
        }
        return userRepository.findById(message.getSenderId())
                .map(sender -> {
                    message.setSender(sender);
                    return message;
                })
                .defaultIfEmpty(message);
    }

    public Mono<Message> loadMessageReceiver(Message message) {
        if (message.getReceiverId() == null) {
            return Mono.just(message);
        }
        return userRepository.findById(message.getReceiverId())
                .map(receiver -> {
                    message.setReceiver(receiver);
                    return message;
                })
                .defaultIfEmpty(message);
    }

    public Mono<Message> loadMessageAttachments(Message message) {
        return messageAttachementRepository.findAll()
                .filter(attachment -> attachment.getMessageId() != null &&
                                     attachment.getMessageId().equals(message.getId()))
                .collectList()
                .map(attachments -> {
                    message.setMessageAttachements(attachments);
                    return message;
                });
    }

    // --- Chatbot relationships ---

    public Mono<Chatbot> loadChatbotWithRelations(Chatbot chatbot) {
        return Mono.just(chatbot)
                .flatMap(this::loadChatbotOrganization)
                .flatMap(this::loadChatbotAttachments);
    }

    public Mono<Chatbot> loadChatbotOrganization(Chatbot chatbot) {
        if (chatbot.getOrganizationId() == null) {
            return Mono.just(chatbot);
        }
        return organizationRepository.findById(chatbot.getOrganizationId())
                .map(organization -> {
                    chatbot.setOrganization(organization);
                    return chatbot;
                })
                .defaultIfEmpty(chatbot);
    }

    public Mono<Chatbot> loadChatbotAttachments(Chatbot chatbot) {
        return chatbotAttachementRepository.findAll()
                .filter(attachment -> attachment.getChatbotId() != null &&
                                     attachment.getChatbotId().equals(chatbot.getId()))
                .collectList()
                .map(attachments -> {
                    chatbot.setChatbotAttachements(attachments);
                    return chatbot;
                });
    }

    // --- MessageAttachment relationships ---

    public Mono<MessageAttachement> loadMessageAttachmentWithMessage(MessageAttachement attachment) {
        if (attachment.getMessageId() == null) {
            return Mono.just(attachment);
        }
        return messageRepository.findById(attachment.getMessageId())
                .flatMap(this::loadMessageWithRelations)
                .map(message -> {
                    attachment.setMessage(message);
                    return attachment;
                })
                .defaultIfEmpty(attachment);
    }

    // --- ChatbotAttachment relationships ---

    public Mono<ChatbotAttachement> loadChatbotAttachmentWithChatbot(ChatbotAttachement attachment) {
        if (attachment.getChatbotId() == null) {
            return Mono.just(attachment);
        }
        return chatbotRepository.findById(attachment.getChatbotId())
                .map(chatbot -> {
                    attachment.setChatbot(chatbot);
                    return attachment;
                })
                .defaultIfEmpty(attachment);
    }

    // --- Organization relationships ---

    public Mono<Organization> loadOrganizationWithRelations(Organization organization) {
        return Mono.just(organization)
                .flatMap(this::loadOrganizationUsers)
                .flatMap(this::loadOrganizationChatbots);
    }

    public Mono<Organization> loadOrganizationUsers(Organization organization) {
        return userRepository.findAll()
                .filter(user -> user.getOrganizationId() != null &&
                               user.getOrganizationId().equals(organization.getId()))
                .collectList()
                .map(users -> {
                    organization.setUsers(users);
                    return organization;
                });
    }

    public Mono<Organization> loadOrganizationChatbots(Organization organization) {
        return chatbotRepository.findAll()
                .filter(chatbot -> chatbot.getOrganizationId() != null &&
                                  chatbot.getOrganizationId().equals(organization.getId()))
                .collectList()
                .map(chatbots -> {
                    organization.setChatbots(chatbots);
                    return organization;
                });
    }
}