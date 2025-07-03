package inc.yowyob.service.snappy.infrastructure.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.r2dbc.config.EnableR2dbcAuditing;

@Configuration
@EnableR2dbcAuditing
public class R2dbcConfig {
    // R2DBC configuration for auditing features like @CreatedDate and @LastModifiedDate
}