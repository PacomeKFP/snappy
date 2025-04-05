package inc.yowyob.service.snappy.domain.exceptions;

public class ProjectNotFoundException extends EntityNotFoundException {
  public ProjectNotFoundException(String message) {
    super(message);
  }
}
