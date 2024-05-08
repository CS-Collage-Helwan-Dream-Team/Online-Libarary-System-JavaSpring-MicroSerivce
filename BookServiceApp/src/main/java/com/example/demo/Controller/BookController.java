package com.example.demo.Controller;


import com.example.demo.Model.Book;
import com.example.demo.Model.Category;
import com.example.demo.Repository.BookRepository;
import com.example.demo.Requests.AddBookRequest;
import com.example.demo.Requests.UpdateBookRequest;
import com.example.demo.Service.BookService;
import com.example.demo.Service.CategoryService;
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
    private final CategoryService CategoryService;

    @Autowired
    public BookController(BookService bookService, BookRepository bookRepository , CategoryService CategoryService){
        this.bookService = bookService;
        this.bookRepository = bookRepository;
        this.CategoryService = CategoryService;
    }
    @AuthorizationRequired
    @UserRoleCheck(UserRole.LIBRARIAN)

    @RequestMapping("/")
    public String home() {
        return "Hello, World!";
    }


    @GetMapping
    public ResponseEntity<ResponseDTO> getAllBooks(@RequestHeader("credentials") String credentials) {

        List<Book> book  = bookService.getAllBooks();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDTO(
                        "Books found successfully",
                        HttpStatus.OK,
                        new HashMap<String , Object>(){{
                            put("books", book);
                        }}
                )
        );
    }

    @GetMapping("/isbn")
    public ResponseEntity<List<Book>> findBooksByIsbn(@RequestParam String ISBN) {
        List<Book> books = bookService.findBooksByIsbn(ISBN);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/rack")
    public ResponseEntity<List<Book>> findBooksByRackNumber(@RequestParam int rackNumber) {
        List<Book> books = bookService.findBooksByRackNumber(rackNumber);
        return ResponseEntity.ok(books);
    }

        @GetMapping("/category")
    public ResponseEntity<ResponseDTO> getCategories(@RequestHeader("credentials") String credentials) {
        List<Category> categories = CategoryService.getCategories();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDTO(
                        "Categories found successfully",
                        HttpStatus.OK,
                        new HashMap<String , Object>(){{
                            put("categories", categories);
                        }}
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO> getBookById(@PathVariable Integer id,@RequestHeader("credentials") String credentials) {
        Book book = bookService.getBookById(id);

        if (book != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDTO(
                            "Book found successfully",
                            HttpStatus.OK,
                            new HashMap<String , Object>(){{
                                put("book", book);
                            }}));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDTO(
                            "Book not found",
                            HttpStatus.BAD_REQUEST
                    )
            );
        }
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
        else if(bookService.checkIsbn(addBookRequest.getIsbn())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDTO(
                            "ISBN already exists",
                            HttpStatus.BAD_REQUEST
                    )
            );
        }
        else {
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
