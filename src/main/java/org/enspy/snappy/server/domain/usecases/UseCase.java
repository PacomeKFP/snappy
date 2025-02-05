package org.enspy.snappy.server.domain.usecases;

public interface UseCase<D, P> {
  P execute(D dto);
}
