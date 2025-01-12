package org.enspy.snappy.server.domain.callbacks;

import com.corundumstudio.socketio.AckCallback;
import com.corundumstudio.socketio.VoidAckCallback;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class SendMessageCallback extends VoidAckCallback {

    @Override
    public void onSuccess() {
       log.info("Message sent with sucess");
    }

    @Override
    public void onTimeout() {
        log.info("Message timed out");
    }
}
