package org.enspy.snappy.server.infrastructure.storages;

import com.corundumstudio.socketio.SocketIOClient;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class ConnectedUser {
    private final String userId;
    private final String deviceId;
    private final SocketIOClient session;
    private final String ipAddress;
    private final int port;
    private final LocalDateTime connectedAt;

    public ConnectedUser(String userId, String deviceId, SocketIOClient session, String ipAddress, int port) {
        this.userId = userId;
        this.deviceId = deviceId;
        this.session = session;
        this.ipAddress = ipAddress;
        this.port = port;
        this.connectedAt = LocalDateTime.now();
    }
}
