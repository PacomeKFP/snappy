package org.enspy.snappy.server.domain.exceptions;

public class AuthenticationFailedException extends EntityNotFoundException {
    public AuthenticationFailedException(String message) {
        super(message);
    }
}