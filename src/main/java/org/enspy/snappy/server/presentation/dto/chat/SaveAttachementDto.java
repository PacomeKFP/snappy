package org.enspy.snappy.server.presentation.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.enspy.snappy.server.domain.entities.Message;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveAttachementDto {
    private Message message;
    private List<MultipartFile> attachements;
}
