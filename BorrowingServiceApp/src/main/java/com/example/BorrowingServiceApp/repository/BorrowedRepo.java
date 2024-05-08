package com.example.BorrowingServiceApp.repository;

import com.example.BorrowingServiceApp.models.entities.BorrowedBooks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BorrowedRepo extends JpaRepository<BorrowedBooks, Integer>{
    List<BorrowedBooks> findAllByUserId(Integer userId);
    boolean existsByUserIdAndBookId(Integer userId, Integer bookId);
    boolean existsByBookIdAndReturnedAtIsNull(Integer bookId);
    Optional<BorrowedBooks> findByUserIdAndBookIdAndReturnedAtIsNull(Integer userId, Integer bookId);
}
