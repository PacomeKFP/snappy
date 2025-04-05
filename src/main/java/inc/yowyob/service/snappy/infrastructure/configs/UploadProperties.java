package inc.yowyob.service.snappy.infrastructure.configs;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.upload")
@Data
public class UploadProperties {
  private String dir = "uploads"; // valeur par défaut
  private String baseUrl = "/uploads"; // URL de base pour accéder aux fichiers
  private long maxFileSize = 10485760L; // 10MB par défaut
}
