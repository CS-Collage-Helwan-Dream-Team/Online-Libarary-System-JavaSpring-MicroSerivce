package com.example.demo.test;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book addNewBook(Book book) {
        return bookRepository.save(book);
    }

    public void deleteBook(int bookId) {
        boolean exists = bookRepository.existsById(bookId);
        if (!exists) {
            throw new IllegalStateException("Book with id " + bookId + " does not exist");
        }
        bookRepository.deleteById(bookId);
    }

    public Book updateBook(int bookId, Book book) {
        Book existingBook = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalStateException("Book with id " + bookId + " does not exist"));

        existingBook.setTitle(book.getTitle());
        existingBook.setAuthorName(book.getAuthorName());
        existingBook.setIsbn(book.getIsbn());
        existingBook.setRackNumber(book.getRackNumber());
        existingBook.setDescription(book.getDescription());
        existingBook.setIsAvailable(book.getIsAvailable());
        existingBook.setCategoryId(book.getCategoryId());
        existingBook.setImageUrl(book.getImageUrl());
        return bookRepository.save(existingBook);
    }
}
