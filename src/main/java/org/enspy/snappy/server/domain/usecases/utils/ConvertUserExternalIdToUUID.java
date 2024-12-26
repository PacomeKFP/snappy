package org.enspy.snappy.server.domain.usecases.utils;

import org.enspy.snappy.server.domain.usecases.UseCase;

import java.util.UUID;

public class ConvertUserExternalIdToUUID implements UseCase<String, UUID> {
    @Override
    public UUID execute(String dto) {
        return null;
    }
}
