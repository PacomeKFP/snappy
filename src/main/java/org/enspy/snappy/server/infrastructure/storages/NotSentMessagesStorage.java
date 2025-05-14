package org.enspy.snappy.server.infrastructure.storages;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import org.enspy.snappy.server.domain.entities.Message;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public class NotSentMessagesStorage {
    /**
     * [UserExternalId]: [notSentMessages]
     * */
    //private final ConcurrentHashMap<String, ArrayList<Message>> notSentMessages = new ConcurrentHashMap<>();

    //Nouveau
    private Map<String, List<MessageDeliveryStatus>> notSentMessages = new ConcurrentHashMap<>();


public class MessageDeliveryStatus {
    private Message message;
    private Set<String> deliveredToDevices; // Ensemble des IDs d'appareils ayant reçu le message
    
    public MessageDeliveryStatus(Message message) {
        this.message = message;
        this.deliveredToDevices = new HashSet<>();
    }
    
    
    public Message getMessage() {
        return message;
    }
    
    public boolean markDeliveredToDevice(String deviceId) {
        return deliveredToDevices.add(deviceId);
    }
    
    public int getDeliveredDeviceCount() {
        return deliveredToDevices.size();
    }
    
    public boolean isDeliveredToDevice(String deviceId) {
        return deliveredToDevices.contains(deviceId);
    }
}

    /*public Mono<Void> addNotSentMessageForUser(String userId, Message message) {
        return Mono.fromRunnable(() -> {
            notSentMessages.computeIfAbsent(userId, k -> new ArrayList<>()).add(message);
        });
    }
    
    public Mono<Void> removeNotSentMessageForUser(String userId, Message message) {
        return Mono.fromRunnable(() -> {
            if (notSentMessages.containsKey(userId)) {
                notSentMessages.get(userId).remove(message);
            }
        });
    }
    
    public Mono<Void> clearNotSentMessagesForUser(String userId) {
        return Mono.fromRunnable(() -> notSentMessages.remove(userId));
    }
    
    public Flux<Message> getNotSentMessagesForUser(String userId) {
        return Mono.justOrEmpty(notSentMessages.get(userId))
            .defaultIfEmpty(new ArrayList<>())
            .flatMapMany(Flux::fromIterable);
    }*/

   // Nouveau
public void addNotSentMessage(Message message) {
    String receiverId = message.getReceiverId();
    
    if (!notSentMessages.containsKey(receiverId)) {
        notSentMessages.put(receiverId, new ArrayList<>());
    }
    
    notSentMessages.get(receiverId).add(new MessageDeliveryStatus(message));
    log.info("Added not sent message {} for user {}", message.getId(), receiverId);
}


public void addNotSentMessageForMultipleUsers(Message message, List<String> receiverIds) {
    for (String receiverId : receiverIds) {
    
        Message messageCopy = new Message();
        BeanUtils.copyProperties(message, messageCopy);
        messageCopy.setReceiverId(receiverId);
        
        addNotSentMessage(messageCopy);
    }
}


public List<Message> getNotSentMessagesForUser(String userId) {
    if (!notSentMessages.containsKey(userId)) {
        return Collections.emptyList();
    }
    
    return notSentMessages.get(userId).stream()
            .map(MessageDeliveryStatus::getMessage)
            .collect(Collectors.toList());
}


public List<Message> getNotSentMessagesForDevice(String userId, String deviceId) {
    if (!notSentMessages.containsKey(userId)) {
        return Collections.emptyList();
    }
    
    return notSentMessages.get(userId).stream()
            .filter(status -> !status.isDeliveredToDevice(deviceId))
            .map(MessageDeliveryStatus::getMessage)
            .collect(Collectors.toList());
}


public boolean markMessageDeliveredToDevice(String messageId, String userId, String deviceId, int connectedDeviceCount) {
    if (!notSentMessages.containsKey(userId)) {
        return false;
    }
    
    List<MessageDeliveryStatus> messages = notSentMessages.get(userId);
    Optional<MessageDeliveryStatus> messageStatusOpt = messages.stream()
            .filter(status -> status.getMessage().getId().equals(messageId))
            .findFirst();
    
    if (!messageStatusOpt.isPresent()) {
        return false;
    }
    
    MessageDeliveryStatus messageStatus = messageStatusOpt.get();
    messageStatus.markDeliveredToDevice(deviceId);
    
    log.info("Marked message {} as delivered to device {} of user {}", 
             messageId, deviceId, userId);
    
    
    if (messageStatus.getDeliveredDeviceCount() >= connectedDeviceCount) {
        messages.remove(messageStatus);
        log.info("Message {} removed from not sent messages (delivered to all devices)", messageId);
        
        
        if (messages.isEmpty()) {
            notSentMessages.remove(userId);
        }
        
        return true;
    }
    
    return false;
}


}