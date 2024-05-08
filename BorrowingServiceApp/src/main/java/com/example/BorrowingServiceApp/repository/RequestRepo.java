package com.example.BorrowingServiceApp.repository;

import com.example.BorrowingServiceApp.models.entities.BorrowRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepo extends JpaRepository<BorrowRequest, Integer>{
    boolean existsByUserIdAndBookIdAndStatus(Integer userId, Integer bookId, String status);
}
