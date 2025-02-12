package org.enspy.snappy.server.domain.usecases.chat;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.entities.MessageAttachement;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.configs.UploadProperties;
import org.enspy.snappy.server.infrastructure.repositories.MessageAttachementRepository;
import org.enspy.snappy.server.presentation.dto.chat.SaveMessageAttachementDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Log4j2
public class SaveMessageAttachementUseCase implements UseCase<SaveMessageAttachementDto, List<MessageAttachement>> {

    private final UploadProperties uploadProperties;
    private final MessageAttachementRepository messageAttachementRepository;

    public SaveMessageAttachementUseCase(MessageAttachementRepository messageAttachementRepository, UploadProperties uploadProperties) {
        this.messageAttachementRepository = messageAttachementRepository;
        this.uploadProperties = uploadProperties;
    }

    public List<MessageAttachement> execute(SaveMessageAttachementDto dto) {
        String uploadDir = System.getProperty("user.dir") + "/" + uploadProperties.getDir();

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        List<MessageAttachement> savedMessageAttachements = new ArrayList<>();

        for (MultipartFile file : dto.getAttachements()) {
            String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String absolutePath = uploadDir + File.separator + uniqueFileName;
            // Construire l'URL accessible publiquement
            String publicPath = uploadProperties.getBaseUrl() + "/" + uniqueFileName;

            try {
                // Save physical file
                FileOutputStream fout = new FileOutputStream(absolutePath);
                file.getInputStream().transferTo(fout);
                fout.close();

                MessageAttachement messageAttachement = new MessageAttachement();
                messageAttachement.setFilename(file.getOriginalFilename());
                messageAttachement.setMimetype(file.getContentType());
                messageAttachement.setFilesize(file.getSize());
                messageAttachement.setPath(publicPath); // Stocker le chemin public accessible
                messageAttachement.setMessage(dto.getMessage());

                savedMessageAttachements.add(messageAttachement);

                log.info("File saved successfully: {}", uniqueFileName);
            } catch (Exception e) {
                log.error("Error saving file: {}", file.getOriginalFilename(), e);
                throw new RuntimeException("Failed to save file: " + file.getOriginalFilename(), e);
            }
        }

        log.info("Saved {} attachements for message {}", savedMessageAttachements.size(), dto.getMessage().getId());
        return messageAttachementRepository.saveAll(savedMessageAttachements);

    }
}
