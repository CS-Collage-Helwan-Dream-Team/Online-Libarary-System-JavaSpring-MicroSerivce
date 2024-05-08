package com.example.BorrowingServiceApp.repository;

import com.example.BorrowingServiceApp.models.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepo extends JpaRepository<Book, Integer>{
}
