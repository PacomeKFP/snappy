package inc.yowyob.service.snappy.domain.exceptions;

public class IllegalStateTransitionException extends RuntimeException {
  public IllegalStateTransitionException(String message) {
    super(message);
  }
}
