package org.enspy.snappy.server.domain.usecases;

import reactor.core.publisher.Flux;

public interface FluxUseCase<D, P> {
  Flux<P> execute(D dto);
}
