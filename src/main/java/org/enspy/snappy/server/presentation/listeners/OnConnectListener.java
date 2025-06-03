package org.enspy.snappy.server.presentation.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.ConnectListener;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.entities.Device;
import org.enspy.snappy.server.domain.entities.User;
import org.enspy.snappy.server.domain.usecases.authentication.AuthenticateSocketRequest;
import org.enspy.snappy.server.infrastructure.repositories.DeviceRepository;
import org.enspy.snappy.server.infrastructure.storages.ConnectedUserStorage;
import org.enspy.snappy.server.infrastructure.storages.NotSentMessagesStorage;
import org.enspy.snappy.server.presentation.dto.socket.DeviceIdentificationPayload;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;


@Component
@Log4j2
public class OnConnectListener implements ConnectListener {

  private final ConnectedUserStorage connectedUserStorage;
  private final NotSentMessagesStorage notSentMessagesStorage;
  private final AuthenticateSocketRequest authenticateSocketRequest;
  private final DeviceRepository deviceRepository; // Added

  public OnConnectListener(
      ConnectedUserStorage connectedUserStorage,
      NotSentMessagesStorage notSentMessagesStorage,
      AuthenticateSocketRequest authenticateSocketRequest,
      DeviceRepository deviceRepository) { // Added
    this.connectedUserStorage = connectedUserStorage;
    this.notSentMessagesStorage = notSentMessagesStorage;
    this.authenticateSocketRequest = authenticateSocketRequest;
    this.deviceRepository = deviceRepository; // Added
  }

  @Override
  public void onConnect(SocketIOClient client) {
    log.info("New client attempting to connect with session ID: " + client.getSessionId());

    try {
        User user = authenticateSocketRequest.execute(client.getHandshakeData())
            .blockOptional() // Use blockOptional to handle cases where authentication might fail
            .orElseThrow(() -> new SecurityException("Authentication failed for socket connection."));

        log.info("Client authenticated as user ID: {}", user.getId().toString());

        client.addEventListener("IDENTIFY_DEVICE", DeviceIdentificationPayload.class, (cli, payload, ackRequest) -> {
            String userIdStr = user.getId().toString();
            String deviceIdFromPayload = payload.getDeviceId();
            log.info("Received IDENTIFY_DEVICE event for user ID: {}, device ID: {}", userIdStr, deviceIdFromPayload);

            deviceRepository.findByUserIdAndDeviceId(userIdStr, deviceIdFromPayload)
                .flatMap(device -> {
                    log.info("Device ID: {} successfully identified for user ID: {}", deviceIdFromPayload, userIdStr);
                    cli.set("userId", userIdStr);
                    cli.set("deviceId", deviceIdFromPayload);

                    // Assuming ConnectedUserStorage is adapted for SocketIOClient
                    // The original signature was (String userId, String deviceId, WebSocketSession session, String ipAddress, int port)
                    // We adapt by passing the client itself, and extracting remote address info.
                    // This part might need adjustment based on ConnectedUser/ConnectedUserStorage actual implementation.
                    String ipAddress = cli.getRemoteAddress() != null ? cli.getRemoteAddress().toString() : "unknown";
                    int port = cli.getRemoteAddress() instanceof java.net.InetSocketAddress ?
                               ((java.net.InetSocketAddress) cli.getRemoteAddress()).getPort() : 0;

                    connectedUserStorage.addConnectedUser(userIdStr, deviceIdFromPayload, cli, ipAddress, port);
                    log.info("User ID: {} with Device ID: {} added to connected users.", userIdStr, deviceIdFromPayload);

                    // TODO: Send any queued messages for this user/device if applicable
                    // TODO: Consider broadcasting a "DEVICE_CONNECTED" event if needed

                    return Mono.empty(); // Return empty Mono as we don't need to return a value from flatMap here
                })
                .switchIfEmpty(Mono.defer(() -> { // This will be executed if findByUserIdAndDeviceId is empty
                    log.error("Device ID: {} validation failed for user ID: {}. Disconnecting client.", deviceIdFromPayload, userIdStr);
                    cli.disconnect();
                    return Mono.empty();
                }))
                .doOnError(throwable -> {
                    log.error("Error processing IDENTIFY_DEVICE event for user ID: {}, device ID: {}. Error: {}", userIdStr, deviceIdFromPayload, throwable.getMessage());
                    cli.disconnect();
                })
                .subscribe();
        });

        log.info("IDENTIFY_DEVICE listener registered for client session ID: {}", client.getSessionId());

    } catch (Exception e) {
        log.error("Authentication or connection setup failed for client session ID: {}. Error: {}", client.getSessionId(), e.getMessage());
        client.disconnect(); // Disconnect if initial authentication fails
    }

    /*Pour chaque message recu, envoyer le message à l'utilisateur qui s'est connecté*/
    //        List<Message> notSentUserMessages =
    // notSentMessagesStorage.getNotSentMessagesForUser(userId);
    //        if (!notSentUserMessages.isEmpty()) {
    //            List<Message> messagesToProcess = new ArrayList<>(notSentUserMessages);
    //            for (Message message : messagesToProcess) {
    //                client.sendEvent(WebSocketHelper.OutputEndpoints.SEND_MESSAGE_TO_USER,
    // message);
    //                notSentMessagesStorage.removeNotSentMessageForUser(userId, message);
    //            }
    //        }
  }
}
