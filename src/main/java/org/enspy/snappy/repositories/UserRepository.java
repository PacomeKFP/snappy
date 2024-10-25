package org.enspy.snappy.repositories;

import org.enspy.snappy.models.User;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends CassandraRepository<User, UUID> {
    @Query("SELECT * FROM user WHERE email = ?0 AND password = ?1 ALLOW FILTERING")
    Optional<User> findByEmailAndPassword(String email, String password);
}
