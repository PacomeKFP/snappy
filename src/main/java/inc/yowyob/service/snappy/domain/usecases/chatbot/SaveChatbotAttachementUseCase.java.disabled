package inc.yowyob.service.snappy.domain.usecases.chatbot;

import inc.yowyob.service.snappy.domain.entities.ChatbotAttachement;
import inc.yowyob.service.snappy.domain.usecases.UseCase;
import inc.yowyob.service.snappy.infrastructure.configs.UploadProperties;
import inc.yowyob.service.snappy.infrastructure.repositories.ChatbotAttachementRepository;
import inc.yowyob.service.snappy.presentation.dto.chatbot.SaveChatbotAttachementDto;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Log4j2
public class SaveChatbotAttachementUseCase
    implements UseCase<SaveChatbotAttachementDto, List<ChatbotAttachement>> {

  private final UploadProperties uploadProperties;
  private final ChatbotAttachementRepository chatbotAttachementRepository;

  public SaveChatbotAttachementUseCase(
      UploadProperties uploadProperties,
      ChatbotAttachementRepository chatbotAttachementRepository) {
    this.uploadProperties = uploadProperties;
    this.chatbotAttachementRepository = chatbotAttachementRepository;
  }

  public List<ChatbotAttachement> execute(SaveChatbotAttachementDto dto) {
    String uploadDir = System.getProperty("user.dir") + "/" + uploadProperties.getDir();

    File directory = new File(uploadDir);
    if (!directory.exists()) {
      directory.mkdirs();
    }

    List<ChatbotAttachement> savedChatbotAttachements = new ArrayList<>();

    for (MultipartFile file : dto.getAttachements()) {
      String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
      String absolutePath = uploadDir + File.separator + uniqueFileName;
      String publicPath = uploadProperties.getBaseUrl() + "/" + uniqueFileName;

      try {
        // Save physical file
        FileOutputStream fout = new FileOutputStream(absolutePath);
        file.getInputStream().transferTo(fout);
        fout.close();

        ChatbotAttachement chatbotAttachement = new ChatbotAttachement();
        chatbotAttachement.setFilename(file.getOriginalFilename());
        chatbotAttachement.setMimetype(file.getContentType());
        chatbotAttachement.setFilesize(file.getSize());
        chatbotAttachement.setPath(publicPath); // Stocker le chemin public accessible
        chatbotAttachement.setChatbot(dto.getChatbot());

        savedChatbotAttachements.add(chatbotAttachement);

        log.info("File saved successfully: {}", uniqueFileName);
      } catch (Exception e) {
        log.error("Error saving file: {}", file.getOriginalFilename(), e);
        throw new RuntimeException("Failed to save file: " + file.getOriginalFilename(), e);
      }
    }

    log.info(
        "Saved {} attachements for chatbot {}",
        savedChatbotAttachements.size(),
        dto.getChatbot().getId());
    return chatbotAttachementRepository.saveAll(savedChatbotAttachements);
  }
}
