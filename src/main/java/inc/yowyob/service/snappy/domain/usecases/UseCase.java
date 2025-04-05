package inc.yowyob.service.snappy.domain.usecases;

public interface UseCase<D, P> {
  P execute(D dto);
}
