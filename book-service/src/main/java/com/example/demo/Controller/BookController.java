package com.example.demo.Controller;


import com.example.demo.Model.Book;
import com.example.demo.Repository.BookRepository;
import com.example.demo.Requests.AddBookRequest;
import com.example.demo.Requests.UpdateBookRequest;
import com.example.demo.Service.BookService;
import com.example.demo.annotations.UserRoleCheck;
import com.example.demo.dtos.ResponseDTO;
import com.example.demo.enums.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.annotations.AuthorizationRequired;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;
    private final BookRepository bookRepository;

    @AuthorizationRequired
    @UserRoleCheck(UserRole.LIBRARIAN)

    @RequestMapping("/")
    public String home() {
        return "Hello, World!";
    }

    @Autowired
    public BookController(BookService bookService, BookRepository bookRepository) {
        this.bookService = bookService;
        this.bookRepository = bookRepository;
    }


    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping
    public ResponseEntity<ResponseDTO> addBook(
            @RequestBody AddBookRequest addBookRequest,
            @RequestHeader("credentials") String credentials){
        if(bookService.addCheckNull(addBookRequest)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDTO(
                            "Please fill all the fields",
                            HttpStatus.BAD_REQUEST
                    )
            );
        }
        Book book = bookService.addBook(addBookRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseDTO(
                        "Book added successfully",
                        HttpStatus.CREATED,
                        new HashMap<String , Object>(){{
                            put("book", book);
                        }}
                )
        );
    }

    @DeleteMapping(path = "{bookId}")
    public ResponseEntity<?> deleteBook(
            @PathVariable("bookId") int bookId,
            @RequestHeader("credentials") String credentials) {
        Book book = bookService.findById(bookId);
        if(book == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDTO(
                            "Book not found",
                            HttpStatus.BAD_REQUEST
                    )
            );
        }
        bookService.deleteBook(bookId);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDTO(
                        "Book deleted successfully",
                        HttpStatus.OK
                )
        );
    }

    @PutMapping(path = "{bookId}")
    public ResponseEntity<ResponseDTO> updateBook(
            @PathVariable("bookId") int bookId,
            @RequestBody UpdateBookRequest updateBookRequest,
            @RequestHeader("credentials") String credentials) {
        Book book = bookService.findById(bookId);
        if(book == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDTO(
                            "Book not found",
                            HttpStatus.BAD_REQUEST
                    )
            );
        }
        else if(bookService.updateCheckNull(updateBookRequest)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDTO(
                            "Please fill all the fields",
                            HttpStatus.BAD_REQUEST
                    )
            );
        }
        else{
            Book updatedBook = bookService.updateBook(bookId, updateBookRequest);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDTO(
                            "Book updated successfully",
                            HttpStatus.OK,
                            new HashMap<String , Object>(){{
                                put("book", updatedBook);
                            }}
                    )
            );
        }
    }



}
