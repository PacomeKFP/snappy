package org.enspy.snappy;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;

import com.datastax.oss.driver.api.core.CqlSession;

@Configuration
public class CassandraConfig extends AbstractCassandraConfiguration {

    @Override
    protected String getKeyspaceName() {
        return "snappy";
    }

    @Override
    protected String getContactPoints() {
        return "localhost";
    }

    @Override
    protected int getPort() {
        return 9042;
    }


    public CqlSession session() {
        return CqlSession.builder()
                .withLocalDatacenter("datacenter1")
                .build();
    }
}
