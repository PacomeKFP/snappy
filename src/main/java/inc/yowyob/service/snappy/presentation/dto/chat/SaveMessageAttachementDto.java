package inc.yowyob.service.snappy.presentation.dto.chat;

import inc.yowyob.service.snappy.domain.entities.Message;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveMessageAttachementDto {
  private Message message;
  private List<MultipartFile> attachements;
}
