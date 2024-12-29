package org.enspy.snappy.server.infrastructure.helpers;

import com.corundumstudio.socketio.HandshakeData;

import java.util.UUID;

public class WebSocketHelper {
    /**
     * Obtenir Utilisateur qui derriere à une requette
     */
    public static String getUserFromHandShake(HandshakeData handshakeData) {
        return handshakeData.getSingleUrlParam("user");
    }

    /**
     * les points d'entrée des messages - les endpoints sur lesquels on reçoit les messages des utilisateurs
     */
    public static class InputEndpoints {
        public static String REVEICE_MESSAGE_FROM_USER = "post-message";
    }

    /**
     * Les points de sortie des messages - les endpoints sur lesquels on envoie les messages aux utilisateurs
     */
    public static class OutputEndpoints {
        public static String SEND_MESSAGE_TO_USER = "get-message";

    }
}
