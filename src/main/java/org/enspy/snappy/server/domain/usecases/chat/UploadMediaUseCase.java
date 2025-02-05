package org.enspy.snappy.server.domain.usecases.chat;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.presentation.dto.chat.UploadMediaDto;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class UploadMediaUseCase implements UseCase<UploadMediaDto, List<String>> {

    @Override
    public List<String> execute(UploadMediaDto dto) {
        String uploadDir = System.getProperty("user.dir") + "/uploads";
        List<String> uploadStatuses = new ArrayList<>();

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        assert dto.getFiles() != null;
        for (MultipartFile file : dto.getFiles()) {
            String filePath = uploadDir + File.separator + file.getOriginalFilename();
            String fileUploadStatus;

            try {
                FileOutputStream fout = new FileOutputStream(filePath);
                fout.write(file.getBytes());
                fout.close();
                fileUploadStatus = "File uploaded successfully: " + file.getOriginalFilename() + "--" + dto.getMessageId();
            } catch (Exception e) {
                e.printStackTrace();
                fileUploadStatus = "Error uploading file: " + file.getOriginalFilename() + " - " + e.getMessage();
            }
            uploadStatuses.add(fileUploadStatus);
        }

        return uploadStatuses;
    }
}
