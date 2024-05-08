package com.example.demo.Repository;

import com.example.demo.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    Optional<Book> findBookByIsbn(String isbn);
    List<Book> findByIsbnContaining(String ISBN);
    List<Book> findByRackNumber(int rackNumber);
}
