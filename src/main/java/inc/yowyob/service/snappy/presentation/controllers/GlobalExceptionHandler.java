package inc.yowyob.service.snappy.presentation.controllers;

import inc.yowyob.service.snappy.domain.exceptions.AuthenticationFailedException;
import inc.yowyob.service.snappy.domain.exceptions.EntityNotFoundException;
import inc.yowyob.service.snappy.domain.exceptions.IllegalStateTransitionException;
import io.swagger.v3.oas.annotations.Hidden;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Hidden
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException ex) {
    return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
  }

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<?> handleEntityNotFoundException(EntityNotFoundException ex) {
    return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
  }

  @ExceptionHandler(AuthenticationFailedException.class)
  public ResponseEntity<?> handleAuthenticationFailedException(AuthenticationFailedException ex) {
    return ResponseEntity.status(403).body(Map.of("error", ex.getMessage()));
  }

  @ExceptionHandler(IllegalStateTransitionException.class)
  public ResponseEntity<?> handleIllegalStateTransitionException(AuthenticationFailedException ex) {
    return ResponseEntity.status(409).body(Map.of("error", ex.getMessage()));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<?> handleGeneralException(Exception ex) {
    ex.printStackTrace();
    return ResponseEntity.status(500).body(Map.of("error", ex.getMessage()));
  }
}
