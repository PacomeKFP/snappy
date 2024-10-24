package org.enspy.snappy.repositories;

import org.enspy.snappy.models.User;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends CassandraRepository<User, UUID> {

    Optional<User> findByEmailAndPassword(String email, String password);
}
