package org.enspy.snappy.helpers;
import java.util.HashMap;

public enum ConversationStatus {
    OFF(-1),
    LISTENING(0),
    ON(1);

    private int value;

    ConversationStatus(int value) {
        this.value = value;
    }

}

