package org.enspy.snappy.server.domain.usecases.chat;

import java.io.File;
import java.nio.file.Path;
import java.util.UUID;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.entities.MessageAttachement;
import org.enspy.snappy.server.domain.usecases.FluxUseCase;
import org.enspy.snappy.server.infrastructure.configs.UploadProperties;
import org.enspy.snappy.server.infrastructure.repositories.MessageAttachementRepository;
import org.enspy.snappy.server.presentation.dto.chat.SaveMessageAttachementDto;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Log4j2
public class SaveMessageAttachementUseCase
    implements FluxUseCase<SaveMessageAttachementDto, MessageAttachement> {

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
    if (dto == null || dto.getMessage() == null || dto.getAttachements() == null) {
      return Flux.error(
          new IllegalArgumentException("Le message et les pièces jointes sont requis"));
    }

    String uploadDir = System.getProperty("user.dir") + "/" + uploadProperties.getDir();

    // Création du répertoire de façon réactive
    return Mono.fromCallable(
            () -> {
              File directory = new File(uploadDir);
              if (!directory.exists()) {
                if (!directory.mkdirs()) {
                  throw new RuntimeException("Impossible de créer le répertoire d'upload");
                }
              } else if (!directory.canWrite()) {
                throw new RuntimeException("Droits d'écriture insuffisants sur le répertoire");
              }
              return directory;
            })
        .flatMapMany(dir -> Flux.fromIterable(dto.getAttachements()))
        .filter(file -> file instanceof FilePart)
        .cast(FilePart.class)
        .flatMap(
            file -> {
              String uniqueFileName = UUID.randomUUID() + "_" + file.filename();
              String absolutePath = uploadDir + File.separator + uniqueFileName;
              Path filePath = Path.of(absolutePath);
              String publicPath = uploadProperties.getBaseUrl() + "/" + uniqueFileName;

              // Créer l'entité d'attachement
              MessageAttachement messageAttachement = new MessageAttachement();
              messageAttachement.setFilename(file.filename());
              messageAttachement.setMimetype(
                  file.headers().getContentType() != null
                      ? file.headers().getContentType().toString()
                      : null);
              messageAttachement.setPath(publicPath);
              messageAttachement.setMessage(dto.getMessage());

              // Transférer le fichier et récupérer sa taille
              return file.content()
                  .map(DataBuffer::readableByteCount)
                  .reduce(0L, Long::sum)
                  .flatMap(
                      size -> {
                        messageAttachement.setFilesize(size);

                        return file.transferTo(filePath)
                            .then(Mono.just(messageAttachement))
                            .doOnNext(
                                attachment -> log.info("Fichier sauvegardé: {}", uniqueFileName));
                      })
                  .onErrorResume(
                      e -> {
                        log.error(
                            "Erreur lors de la sauvegarde du fichier: {}", file.filename(), e);
                        return Mono.error(
                            new RuntimeException("Échec de la sauvegarde du fichier", e));
                      });
            })
        .flatMap(messageAttachementRepository::save)
        .doOnNext(saved -> log.info("Attachement sauvegardé avec ID: {}", saved.getId()));
  }
}
