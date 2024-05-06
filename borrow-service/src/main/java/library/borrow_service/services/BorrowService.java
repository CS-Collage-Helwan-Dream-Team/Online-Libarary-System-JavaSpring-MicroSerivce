package library.borrow_service.services;

import library.borrow_service.models.entities.Book;
import library.borrow_service.models.entities.BorrowRequest;
import library.borrow_service.models.entities.BorrowedBooks;
import library.borrow_service.repositories.BookRepo;
import library.borrow_service.repositories.BorrowedRepo;
import library.borrow_service.repositories.RequestRepo;
import library.borrow_service.resources.BorrowRequestResources;
import library.borrow_service.resources.BorrowedBookResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BorrowService {

    private final BorrowedRepo borrowedRepo;
    private final RequestRepo requestRepo;
    private final BookRepo bookRepo;

    @Autowired
    public BorrowService(BorrowedRepo borrowedRepo, RequestRepo requestRepo, BookRepo bookRepo) {
        this.borrowedRepo = borrowedRepo;
        this.requestRepo = requestRepo;
        this.bookRepo = bookRepo;
    }

    public List<BorrowRequestResources> getBorrowRequests() {
        return requestRepo.findAll().stream()
                .map(request -> BorrowRequestResources.builder()
                        .BookName(request.getBook().getTitle())
                        .RequestUserName(request.getUserId().toString())
                        .Status(request.getStatus())
                        .RequestedAt(request.getRequestedAt())
                        .build()
                ).collect(Collectors.toList());
    }

    public List<BorrowedBookResource> getUserBorrowedBooks(int userID){
        return borrowedRepo.findAllByUserId(userID).stream()
                .map(borrowed ->  BorrowedBookResource.builder()
                        .BookName(borrowed.getBook().getTitle())
                        .AuthorName(borrowed.getBook().getAuthorName())
                        .BorrowRecordId(borrowed.getRequest().getId())
                        .BorrowedAt(borrowed.getBorrowedAt())
                        .ReturnedAt(borrowed.getReturnedAt())
                        .build())
                .collect(Collectors.toList());
    }
    public int getRequestedUserId(int requestId){
        return requestRepo.findById(requestId).map(BorrowRequest::getUserId).orElse(0);
    }
    public int getRequestedBookId(int requestId){
        return requestRepo.findById(requestId).map(request -> request.getBook().getId()).orElse(0);
    }
    public void approveBorrowRequest(int requestId){
        requestRepo.findById(requestId).ifPresent(request -> {
            request.setStatus("approved");
            requestRepo.save(request);
        });
        //add the book to the borrowed books
        requestRepo.findById(requestId).ifPresent(request -> {
            BorrowedBooks borrowedBook = new BorrowedBooks();
            borrowedBook.setBook(request.getBook());
            borrowedBook.setUserId(request.getUserId());
            borrowedBook.setBorrowedAt(Instant.now());
            borrowedBook.setRequest(request);
            borrowedRepo.save(borrowedBook);
        });
    }
    public void rejectBorrowRequest(int requestId){
        requestRepo.findById(requestId).ifPresent(request -> {
            request.setStatus("rejected");
            requestRepo.save(request);
        });
    }
    public void requestBorrow(int userId, int bookId){
        Optional<Book> optionalBook = bookRepo.findById(bookId);
        BorrowRequest request = new BorrowRequest();
        request.setUserId(userId);
        request.setBook(optionalBook.orElse(null));
        request.setRequestedAt(Instant.now());
        request.setStatus("pending");
        requestRepo.save(request);
    }
    public void returnBorrow(int userId, int bookId){

        Optional<BorrowedBooks> borrowedBookOptional = borrowedRepo.findByUserIdAndBookIdAndReturnedAtIsNull(userId, bookId);
        if (borrowedBookOptional.isPresent()) {
            BorrowedBooks borrowedBook = borrowedBookOptional.get();
            borrowedBook.setReturnedAt(Instant.now());
            borrowedRepo.save(borrowedBook);
        }
    }

    public Map<String,Boolean> isUserCanBorrow(int userId, int bookId){
        boolean userAlreadyBorrowed = checkUserAlreadyBorrowed(userId, bookId);
        boolean bookAlreadyBorrowed = checkBookAlreadyBorrowed(bookId);
        boolean userExceedLimit = checkUserExceedLimit(userId);
        boolean userAlreadyRequested = checkUserAlreadyRequested(userId, bookId);
        boolean isUserNotSubscribed = !checkUserIsSubscribed(userId);

        return Map.of(
                "userAlreadyBorrowed", userAlreadyBorrowed,
                "bookAlreadyBorrowed", bookAlreadyBorrowed,
                "userExceedLimit", userExceedLimit,
                "userAlreadyRequested", userAlreadyRequested,
                "isUserNotSubscribed", isUserNotSubscribed
        );
    }

    private boolean checkUserAlreadyBorrowed(int userId, int bookId){
        return borrowedRepo.existsByUserIdAndBookId(userId, bookId);
    }

    private boolean checkBookAlreadyBorrowed(int bookId){
        return borrowedRepo.existsByBookIdAndReturnedAtIsNull(bookId);
    }

    private boolean checkUserExceedLimit(int userId){
        //TODO: implement the logic to check if the user is allowed to borrow and not exceed the limit
        return false;
    }

    private boolean checkUserAlreadyRequested(int userId, int bookId){
        return requestRepo.existsByUserIdAndBookIdAndStatus(userId, bookId, "pending");
    }
    private boolean checkUserIsSubscribed(int userId){
        //TODO: implement the logic to check if the user is subscribed
        return true;
    }
}
