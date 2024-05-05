package com.example.demo.test;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final  BookService bookService;

    @RequestMapping("/")
    public String home() {
        return "Hello, World!";
    }

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping
    public ResponseEntity<Book> addNewBook(@RequestBody Book book) {
        Book newBook = bookService.addNewBook(book);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable("bookId") int bookId) {
        bookService.deleteBook(bookId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(path = "{bookId}")
    public ResponseEntity<Book> updateBook(@PathVariable("bookId") int bookId, @RequestBody Book book) {
        Book updatedBook = bookService.updateBook(bookId, book);
        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }



}
