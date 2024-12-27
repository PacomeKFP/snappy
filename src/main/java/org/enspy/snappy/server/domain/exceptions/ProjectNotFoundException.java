package org.enspy.snappy.server.domain.exceptions;

public class ProjectNotFoundException extends EntityNotFoundException {
    public ProjectNotFoundException(String message) {
        super(message);
    }
}