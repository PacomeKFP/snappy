package inc.yowyob.service.snappy.domain.exceptions;

public class EntityAlreadyExistsException extends RuntimeException {
  public EntityAlreadyExistsException(String message) {
    super(message);
  }
}
