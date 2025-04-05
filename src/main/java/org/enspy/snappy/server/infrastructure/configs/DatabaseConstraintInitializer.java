package org.enspy.snappy.server.infrastructure.configs;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class DatabaseConstraintInitializer {

    private final DatabaseClient databaseClient;

    public DatabaseConstraintInitializer(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initializeConstraints() {
        Mono.from(databaseClient.sql(createConstraintSQL())
                .fetch()
                .rowsUpdated())
                .subscribe(
                        count -> System.out.println("Contraintes de base de données initialisées"),
                        error -> System.err.println("Erreur lors de l'initialisation des contraintes: " + error.getMessage())
                );
    }

    private String createConstraintSQL() {
        return "DO $$ BEGIN\n" +
               "    -- Users table constraints\n" +
               "    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_organization') THEN\n" +
               "        ALTER TABLE users ADD CONSTRAINT fk_user_organization FOREIGN KEY (organization_id) REFERENCES organizations(id);\n" +
               "    END IF;\n" +
               "\n" +
               "    -- Messages table constraints\n" +
               "    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_message_sender') THEN\n" +
               "        ALTER TABLE messages ADD CONSTRAINT fk_message_sender FOREIGN KEY (sender_id) REFERENCES users(id);\n" +
               "    END IF;\n" +
               "    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_message_receiver') THEN\n" +
               "        ALTER TABLE messages ADD CONSTRAINT fk_message_receiver FOREIGN KEY (receiver_id) REFERENCES users(id);\n" +
               "    END IF;\n" +
               "\n" +
               "    -- Message attachments constraints\n" +
               "    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_message_attachment') THEN\n" +
               "        ALTER TABLE message_attachements ADD CONSTRAINT fk_message_attachment FOREIGN KEY (message_id) REFERENCES messages(id);\n" +
               "    END IF;\n" +
               "\n" +
               "    -- Chatbot constraints\n" +
               "    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_chatbot_organization') THEN\n" +
               "        ALTER TABLE chatbots ADD CONSTRAINT fk_chatbot_organization FOREIGN KEY (organization_id) REFERENCES organizations(id);\n" +
               "    END IF;\n" +
               "\n" +
               "    -- Chatbot attachments constraints\n" +
               "    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_chatbot_attachment') THEN\n" +
               "        ALTER TABLE chatbot_attachements ADD CONSTRAINT fk_chatbot_attachment FOREIGN KEY (chatbot_id) REFERENCES chatbots(id);\n" +
               "    END IF;\n" +
               "\n" +
               "    -- Create user_contacts join table if it doesn't exist\n" +
               "    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_contacts') THEN\n" +
               "        CREATE TABLE user_contacts (\n" +
               "            user_id UUID NOT NULL,\n" +
               "            contact_id UUID NOT NULL,\n" +
               "            PRIMARY KEY (user_id, contact_id),\n" +
               "            FOREIGN KEY (user_id) REFERENCES users(id),\n" +
               "            FOREIGN KEY (contact_id) REFERENCES users(id)\n" +
               "        );\n" +
               "    END IF;\n" +
               "END $$;";
    }
}