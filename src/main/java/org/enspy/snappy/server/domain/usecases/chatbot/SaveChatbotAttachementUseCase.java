package org.enspy.snappy.server.domain.usecases.chatbot;

import java.io.File;
import java.nio.file.Path;
import java.util.UUID;
import lombok.extern.log4j.Log4j2;
import org.enspy.snappy.server.domain.entities.ChatbotAttachement;
import org.enspy.snappy.server.domain.usecases.FluxUseCase;
import org.enspy.snappy.server.infrastructure.configs.UploadProperties;
import org.enspy.snappy.server.infrastructure.repositories.ChatbotAttachementRepository;
import org.enspy.snappy.server.presentation.dto.chatbot.SaveChatbotAttachementDto;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Log4j2
public class SaveChatbotAttachementUseCase
    implements FluxUseCase<SaveChatbotAttachementDto, ChatbotAttachement> {

  private final UploadProperties uploadProperties;
  private final ChatbotAttachementRepository chatbotAttachementRepository;

  public SaveChatbotAttachementUseCase(
      UploadProperties uploadProperties,
      ChatbotAttachementRepository chatbotAttachementRepository) {
    this.uploadProperties = uploadProperties;
    this.chatbotAttachementRepository = chatbotAttachementRepository;
  }

  @Override
  public Flux<ChatbotAttachement> execute(SaveChatbotAttachementDto dto) {
    String uploadDir = System.getProperty("user.dir") + "/" + uploadProperties.getDir();

    // Vérification du répertoire améliorée
    return Mono.fromCallable(() -> {
          File directory = new File(uploadDir);
          if (!directory.exists()) {
            if (!directory.mkdirs()) {
              throw new RuntimeException("Impossible de créer le répertoire d'upload: " + uploadDir);
            }
          } else if (!directory.canWrite()) {
            throw new RuntimeException("Droits d'écriture manquants sur: " + uploadDir);
          }
          return directory;
        })
        .flatMapMany(dir -> {
          if (dto.getAttachements() == null || dto.getAttachements().isEmpty()) {
            return Flux.empty();
          }
          return Flux.fromIterable(dto.getAttachements());
        })
        // Vérification du type avant cast
        .filter(file -> file instanceof FilePart)
        .cast(FilePart.class)
        .flatMap(file -> {
          String uniqueFileName = UUID.randomUUID() + "_" + file.filename();
          String absolutePath = uploadDir + File.separator + uniqueFileName;
          Path filePath = Path.of(absolutePath);
          String publicPath = uploadProperties.getBaseUrl() + "/" + uniqueFileName;

          ChatbotAttachement chatbotAttachement = new ChatbotAttachement();
          chatbotAttachement.setFilename(file.filename());
          chatbotAttachement.setMimetype(
              file.headers().getContentType() != null ?
              file.headers().getContentType().toString() : null);
          chatbotAttachement.setPath(publicPath);
          chatbotAttachement.setChatbotId(dto.getChatbot().getId());

          return file.content()
              .map(DataBuffer::readableByteCount)
              .reduce(0L, Long::sum)
              .flatMap(size -> {
                chatbotAttachement.setFilesize(size);
                // Gestion d'erreur améliorée pendant le transfert
                return file.transferTo(filePath)
                    .onErrorResume(e -> {
                      log.error("Erreur lors du transfert: {}", e.getMessage());
                      return Mono.error(new RuntimeException("Échec d'écriture du fichier", e));
                    })
                    .thenReturn(chatbotAttachement);
              })
              .doOnNext(attachment -> log.info("Fichier préparé: {}", uniqueFileName));
        })
        // Gestion d'erreur pendant la sauvegarde
        .flatMap(attachment -> chatbotAttachementRepository.save(attachment)
            .onErrorResume(e -> {
              log.error("Erreur de sauvegarde en BDD: {}", e.getMessage());
              return Mono.error(new RuntimeException("Échec de sauvegarde en base de données", e));
            }))
        .doOnNext(saved -> log.info("Attachement sauvegardé avec ID: {}", saved.getId()));
  }
}