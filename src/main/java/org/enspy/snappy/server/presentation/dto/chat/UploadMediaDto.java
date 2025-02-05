package org.enspy.snappy.server.presentation.dto.chat;

import jakarta.annotation.Nullable;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UploadMediaDto {
    @Nullable
    private List<MultipartFile> files;
    private String projectId;
    private String messageId;
}

