package com.example.demo.Service;




import com.example.demo.Model.Book;
import com.example.demo.Repository.BookRepository;
import com.example.demo.Requests.AddBookRequest;
import com.example.demo.Requests.UpdateBookRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Book getBookById(int id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        return optionalBook.orElse(null); // Return null if book is not found
    }

    public Book addBook(AddBookRequest addBookRequest) {
        Book newBook = new Book();
        newBook.setTitle(addBookRequest.getTitle());
        newBook.setAuthorName(addBookRequest.getAuthorName());
        newBook.setIsbn(addBookRequest.getIsbn());
        newBook.setRackNumber(addBookRequest.getRackNumber());
        newBook.setDescription(addBookRequest.getDescription());
        newBook.setIsAvailable(addBookRequest.getIsAvailable());
        newBook.setCategoryId(addBookRequest.getCategoryId());
        newBook.setImageUrl(addBookRequest.getImageUrl());
        newBook.setCategory(addBookRequest.getCategory());
        return bookRepository.save(newBook);
    }

    public boolean addCheckNull(AddBookRequest addBookRequest) {
        if(
                isNullOrEmpty(addBookRequest.getTitle()) ||
                        isNullOrEmpty(addBookRequest.getAuthorName()) ||
                        isNullOrEmpty(addBookRequest.getIsbn()) ||
                        isNullOrEmpty(addBookRequest.getDescription()) ||
                        isNullOrEmpty(addBookRequest.getImageUrl())
        ) {
            return true;
        }
            return false;
    }

    public Book findById(Integer id){
        Optional<Book> userOptional = bookRepository.findById(id);
        return userOptional.orElse(null);
    }

    public boolean updateCheckNull(UpdateBookRequest updateBookRequest) {
        if(
                isNullOrEmpty(updateBookRequest.getTitle()) ||
                        isNullOrEmpty(updateBookRequest.getAuthorName()) ||
                        isNullOrEmpty(updateBookRequest.getIsbn()) ||
                        isNullOrEmpty(updateBookRequest.getDescription()) ||
                        isNullOrEmpty(updateBookRequest.getImageUrl())
        ) {
            return true;
        }
        return false;
    }

    private boolean isNullOrEmpty(String value) {
        return value == null || value.isEmpty();
    }



    public void deleteBook(int bookId) {
        boolean exists = bookRepository.existsById(bookId);
        if (!exists) {
            throw new IllegalStateException("Book with id " + bookId + " does not exist");
        }
        bookRepository.deleteById(bookId);
    }

    public Book updateBook(int bookId, UpdateBookRequest updateBookRequest) {
        Book existingBook = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalStateException("Book with id " + bookId + " does not exist"));

        existingBook.setTitle(updateBookRequest.getTitle());
        existingBook.setAuthorName(updateBookRequest.getAuthorName());
        existingBook.setIsbn(updateBookRequest.getIsbn());
        existingBook.setRackNumber(updateBookRequest.getRackNumber());
        existingBook.setDescription(updateBookRequest.getDescription());
        existingBook.setIsAvailable(updateBookRequest.getIsAvailable());
        existingBook.setCategoryId(updateBookRequest.getCategoryId());
        existingBook.setImageUrl(updateBookRequest.getImageUrl());
        return bookRepository.save(existingBook);
    }
}
