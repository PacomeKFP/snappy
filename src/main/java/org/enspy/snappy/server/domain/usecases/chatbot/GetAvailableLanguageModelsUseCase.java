package org.enspy.snappy.server.domain.usecases.chatbot;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.enspy.snappy.server.domain.entities.ChatbotLLM;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.springframework.stereotype.Service;

@Service
public class GetAvailableLanguageModelsUseCase implements UseCase<Void, List<String>> {

  @Override
  public List<String> execute(Void dto) {
    return Arrays.stream(ChatbotLLM.values()).map(Enum::toString).collect(Collectors.toList());
  }
}
