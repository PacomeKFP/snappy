package org.enspy.snappy.server.presentation.dto.chat;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.enspy.snappy.server.domain.entities.Message;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveAttachementDto {
    private Message message;
    private List<MultipartFile> attachements;
}
