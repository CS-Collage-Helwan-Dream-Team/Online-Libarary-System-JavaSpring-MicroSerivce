package com.example.demo.Sub.Repository;

import com.example.demo.Sub.models.SubModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Repository
public interface SubscriberRepository extends JpaRepository<SubModel, Long> {
    Optional<SubModel> findFirstByUserIdOrderByStartDateDesc(Long userId);

    SubModel findTopByUserIdOrderByStartDateDesc(int userId);
}