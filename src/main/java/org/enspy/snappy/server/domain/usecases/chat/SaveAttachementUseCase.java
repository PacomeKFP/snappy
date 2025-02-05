package org.enspy.snappy.server.domain.usecases.chat;

import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.entities.Attachement;
import org.enspy.snappy.server.domain.usecases.UseCase;
import org.enspy.snappy.server.infrastructure.configs.UploadProperties;
import org.enspy.snappy.server.infrastructure.repositories.AttachementRepository;
import org.enspy.snappy.server.presentation.dto.chat.SaveAttachementDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
@Log4j2
public class SaveAttachementUseCase implements UseCase<SaveAttachementDto, List<Attachement>> {

    @Autowired
    private AttachementRepository attachementRepository;

    @Autowired
    private UploadProperties uploadProperties;

    public List<Attachement> execute(SaveAttachementDto dto) {
        String uploadDir = System.getProperty("user.dir") + "/" + uploadProperties.getDir();

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        List<Attachement> savedAttachements = new ArrayList<>();

        for (MultipartFile file : dto.getAttachements()) {
            String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            String absolutePath = uploadDir + File.separator + uniqueFileName;
            // Construire l'URL accessible publiquement
            String publicPath = uploadProperties.getBaseUrl() + "/" + uniqueFileName;

            try {
                // Save physical file
                FileOutputStream fout = new FileOutputStream(absolutePath);
                file.getInputStream().transferTo(fout);
                fout.close();

                // Convert file to base64

                // Create and populate Attachement entity
                Attachement attachement = new Attachement();
                attachement.setFilename(file.getOriginalFilename());
                attachement.setMimetype(file.getContentType());
                attachement.setFilesize(file.getSize());
                attachement.setPath(publicPath); // Stocker le chemin public accessible
                attachement.setMessage(dto.getMessage());

                savedAttachements.add(attachement);

                log.info("File saved successfully: {}", uniqueFileName);
            } catch (Exception e) {
                log.error("Error saving file: {}", file.getOriginalFilename(), e);
                throw new RuntimeException("Failed to save file: " + file.getOriginalFilename(), e);
            }
        }

        log.info("Saved {} attachements for message {}", savedAttachements.size(), dto.getMessage().getId());
        return attachementRepository.saveAll(savedAttachements);

    }
}
