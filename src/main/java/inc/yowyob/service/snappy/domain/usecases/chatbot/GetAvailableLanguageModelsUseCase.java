package inc.yowyob.service.snappy.domain.usecases.chatbot;

import inc.yowyob.service.snappy.domain.entities.ChatbotLLM;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class GetAvailableLanguageModelsUseCase implements UseCase<Void, List<String>> {

  @Override
  public List<String> execute(Void dto) {
    return Arrays.stream(ChatbotLLM.values()).map(Enum::toString).collect(Collectors.toList());
  }
}
