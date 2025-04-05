package org.enspy.snappy.server.domain.usecases.chatbot;

import org.enspy.snappy.server.domain.entities.ChatbotLLM;
import org.enspy.snappy.server.domain.usecases.FluxUseCase;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class GetAvailableLanguageModelsUseCase implements FluxUseCase<Void, String> {

  @Override
  public Flux<String> execute(Void unused) {
    return Flux.fromArray(ChatbotLLM.values()).map(Enum::toString);
  }
}
