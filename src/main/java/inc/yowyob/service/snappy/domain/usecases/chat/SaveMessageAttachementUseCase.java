package inc.yowyob.service.snappy.domain.usecases.chat;

import inc.yowyob.service.snappy.domain.entities.MessageAttachement;
import inc.yowyob.service.snappy.domain.usecases.FluxUseCase;
import inc.yowyob.service.snappy.infrastructure.configs.UploadProperties;
import inc.yowyob.service.snappy.infrastructure.repositories.MessageAttachementRepository;
import inc.yowyob.service.snappy.presentation.dto.chat.SaveMessageAttachementDto;
import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
@Log4j2
public class SaveMessageAttachementUseCase implements FluxUseCase<SaveMessageAttachementDto, MessageAttachement> {

  private final UploadProperties uploadProperties;
  private final MessageAttachementRepository messageAttachementRepository;

  public SaveMessageAttachementUseCase(
      MessageAttachementRepository messageAttachementRepository,
      UploadProperties uploadProperties) {
    this.messageAttachementRepository = messageAttachementRepository;
    this.uploadProperties = uploadProperties;
  }

  @Override
  public Flux<MessageAttachement> execute(SaveMessageAttachementDto dto) {
    String uploadDir = System.getProperty("user.dir") + "/" + uploadProperties.getDir();

    File directory = new File(uploadDir);
    if (!directory.exists()) {
      directory.mkdirs();
    }

    return Flux.fromIterable(dto.getAttachements())
        .flatMap(file -> saveFileAsync(file, uploadDir, dto))
        .doOnComplete(() -> log.info("Saved {} attachements for message {}", 
            dto.getAttachements().size(), dto.getMessage().getId()));
  }

  private Mono<MessageAttachement> saveFileAsync(MultipartFile file, String uploadDir, SaveMessageAttachementDto dto) {
    return Mono.fromCallable(() -> {
      String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
      String absolutePath = uploadDir + File.separator + uniqueFileName;
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
        messageAttachement.setPath(publicPath);
        // Note: In R2DBC, we need to set messageId instead of message object
        messageAttachement.setMessageId(dto.getMessage().getId());

        log.info("File saved successfully: {}", uniqueFileName);
        return messageAttachement;
      } catch (Exception e) {
        log.error("Error saving file: {}", file.getOriginalFilename(), e);
        throw new RuntimeException("Failed to save file: " + file.getOriginalFilename(), e);
      }
    })
    .subscribeOn(Schedulers.boundedElastic()) // Use bounded elastic scheduler for I/O operations
    .flatMap(messageAttachementRepository::save);
  }
}