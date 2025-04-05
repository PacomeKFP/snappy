package inc.yowyob.service.snappy.domain.usecases.user;

import inc.yowyob.service.snappy.domain.entities.User;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.repositories.UserRepository;
import inc.yowyob.service.snappy.presentation.dto.user.FindUserByDisplayNameDto;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class FindUserByDisplayNameUseCase implements UseCase<FindUserByDisplayNameDto, List<User>> {

  private final UserRepository userRepository;

  public FindUserByDisplayNameUseCase(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public List<User> execute(FindUserByDisplayNameDto dto) {
    return userRepository.findByDisplayNameAndProjectId(dto.getDisplayName(), dto.getProjectId());
  }
}
