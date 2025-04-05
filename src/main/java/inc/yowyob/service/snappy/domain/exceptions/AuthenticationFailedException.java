package inc.yowyob.service.snappy.domain.exceptions;

public class AuthenticationFailedException extends RuntimeException {
  public AuthenticationFailedException(String message) {
    super(message);
  }
}
