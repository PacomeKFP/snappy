package inc.yowyob.service.snappy.domain.exceptions;

public class EntityNotFoundException extends RuntimeException {
  public EntityNotFoundException(String message) {
    super(message);
  }
}
