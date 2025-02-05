package org.enspy.snappy.server.infrastructure.helpers;

import com.corundumstudio.socketio.HandshakeData;
import org.enspy.snappy.server.presentation.dto.user.GetUserFromExternalIdAndProjectIdDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

public class WebSocketHelper {
  /** Obtenir Utilisateur qui derriere à une requette on prendra le UUID et pas l'external */
  public static String getUserFromHandShake(HandshakeData handshakeData) {
    String userExternalId = handshakeData.getSingleUrlParam("user");
    String projectId = handshakeData.getSingleUrlParam("projectId");
    // TODO: Quand l'authentification par JWT sera faite, modifier ceci
    //   - l'utilisateur dvra etre automatiquement redirigé vers le bon namespace suivant le projet
    //   - avec les données, on extrait l'ID de l'user
    return handshakeData.getSingleUrlParam("user");
  }

  /**
   * les points d'entrée des messages - les endpoints sur lesquels on reçoit les messages des
   * utilisateurs
   */
  public static class InputEndpoints {
    public static String NEW_USER_CONNECTION = "new-connection";
    public static String NEW_USER_DISCONNECTION = "new-disconnection";

    public static String REVEICE_MESSAGE_FROM_USER = "message/send";

    // ACK
    public static String MESSAGE_RECEIVED_BY_USER = "message/ack/received";
    public static String MESSAGE_READ_BY_USER = "message/ack/read";
  }

  /**
   * Les points de sortie des messages - les endpoints sur lesquels on envoie les messages aux
   * utilisateurs
   */
  public static class OutputEndpoints {
    public static String SEND_MESSAGE_TO_USER = "message-send";

    // ACK
    public static String MESSAGE_RECEIVED_BY_USER = "message-ack-received";
    public static String MESSAGE_READ_BY_USER = "message-ack-read";
  }
}
