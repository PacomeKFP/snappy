package org.enspy.snappy.server.presentation.controllers;

import io.swagger.v3.oas.annotations.Hidden;
import java.util.Map;
import org.enspy.snappy.server.domain.exceptions.AuthenticationFailedException;
import org.enspy.snappy.server.domain.exceptions.EntityNotFoundException;
import org.enspy.snappy.server.domain.exceptions.IllegalStateTransitionException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import reactor.core.publisher.Mono;

@Hidden
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  public Mono<ResponseEntity<?>> handleIllegalArgumentException(IllegalArgumentException ex) {
    ex.printStackTrace();
    return Mono.just(ResponseEntity.badRequest().body(Map.of("error", ex.getMessage())));
  }

  @ExceptionHandler(EntityNotFoundException.class)
  public Mono<ResponseEntity<?>> handleEntityNotFoundException(EntityNotFoundException ex) {
    ex.printStackTrace();
    return Mono.just(ResponseEntity.status(404).body(Map.of("error", ex.getMessage())));
  }

  @ExceptionHandler(AuthenticationFailedException.class)
  public Mono<ResponseEntity<?>> handleAuthenticationFailedException(
      AuthenticationFailedException ex) {
    ex.printStackTrace();
    return Mono.just(ResponseEntity.status(403).body(Map.of("error", ex.getMessage())));
  }

  @ExceptionHandler(IllegalStateTransitionException.class)
  public Mono<ResponseEntity<?>> handleIllegalStateTransitionException(
      IllegalStateTransitionException ex) {
    ex.printStackTrace();
    return Mono.just(ResponseEntity.status(409).body(Map.of("error", ex.getMessage())));
  }

  @ExceptionHandler(Exception.class)
  public Mono<ResponseEntity<?>> handleGeneralException(Exception ex) {
    ex.printStackTrace();
    return Mono.just(ResponseEntity.status(500).body(Map.of("error", ex.getMessage())));
  }
}
