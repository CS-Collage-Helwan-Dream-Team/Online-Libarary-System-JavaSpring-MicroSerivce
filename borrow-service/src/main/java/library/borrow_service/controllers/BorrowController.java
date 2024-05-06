package library.borrow_service.controllers;

import library.borrow_service.annotations.AuthorizationRequired;
import library.borrow_service.annotations.UserRoleCheck;
import library.borrow_service.enums.UserRole;
import library.borrow_service.helpers.CredentialsExtractor;
import library.borrow_service.resources.BorrowRequestResources;
import library.borrow_service.resources.BorrowedBookResource;
import library.borrow_service.resources.ResponseDTO;
import library.borrow_service.services.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/borrow")
public class BorrowController {
    private final BorrowService borrowService;
    @Autowired
    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @AuthorizationRequired
    @UserRoleCheck(UserRole.LIBRARIAN)
    @GetMapping
    public ResponseEntity<ResponseDTO> home(@RequestHeader("credentials") String credentials) {
        List<BorrowRequestResources> borrowRequests = borrowService.getBorrowRequests();
        return ResponseEntity.ok(new ResponseDTO("Borrow requests retrieved successfully.", HttpStatus.OK,borrowRequests));
    }

    @AuthorizationRequired
    @GetMapping("/history")
    public ResponseEntity<ResponseDTO> userHome(@RequestHeader("credentials") String credentials) {
        int authUserId = CredentialsExtractor.getUserId(credentials);
        List<BorrowedBookResource> borrowRequests = borrowService.getUserBorrowedBooks(authUserId);
        return ResponseEntity.ok(new ResponseDTO("Borrow requests retrieved successfully.", HttpStatus.OK,borrowRequests));
    }

    @AuthorizationRequired
    @UserRoleCheck(UserRole.LIBRARIAN)
    @GetMapping("/{Id}/approve")
    public ResponseEntity<ResponseDTO> approveBorrowRequest(@PathVariable("Id") int requestId,@RequestHeader("credentials") String credentials) {
        int requestedUserId = borrowService.getRequestedUserId(requestId);
        int requestedBookId = borrowService.getRequestedBookId(requestId);

        // Check if user can borrow the book
        Map<String,Boolean> isUserCanBorrow = borrowService.isUserCanBorrow(requestedUserId,requestedBookId);
        if(isUserCanBorrow.get("userAlreadyBorrowed"))
            return ResponseEntity.ok(new ResponseDTO("User already borrowed a book.",HttpStatus.BAD_REQUEST));
        if(isUserCanBorrow.get("bookAlreadyBorrowed"))
            return ResponseEntity.ok(new ResponseDTO("Book already borrowed by another user.",HttpStatus.BAD_REQUEST));
        if(isUserCanBorrow.get("userExceedLimit"))
            return ResponseEntity.ok(new ResponseDTO("User exceed the limit of borrowed books.",HttpStatus.BAD_REQUEST));
        if(isUserCanBorrow.get("userAlreadyRequested"))
            return ResponseEntity.ok(new ResponseDTO("User already requested for this book.",HttpStatus.BAD_REQUEST));
        if (isUserCanBorrow.get("isUserNotSubscribed"))
            return ResponseEntity.ok(new ResponseDTO("User is not subscribed.",HttpStatus.BAD_REQUEST));

        // Approve the borrow request
        borrowService.approveBorrowRequest(requestId);

        return ResponseEntity.ok(new ResponseDTO("Borrow request approved successfully.", HttpStatus.OK));
    }

    @AuthorizationRequired
    @UserRoleCheck(UserRole.LIBRARIAN)
    @GetMapping("/{Id}/reject")
    public ResponseEntity<ResponseDTO> rejectBorrowRequest(@PathVariable("Id") int requestId,@RequestHeader("credentials") String credentials) {
        borrowService.rejectBorrowRequest(requestId);
        return ResponseEntity.ok(new ResponseDTO("Borrow request rejected successfully.", HttpStatus.OK));
    }

//    /api/borrow/{borrowBookId}/request
    @AuthorizationRequired
    @PostMapping("/{borrowBookId}/request")
    public ResponseEntity<ResponseDTO> requestBorrow(@PathVariable("borrowBookId") int bookId,@RequestHeader("credentials") String credentials) {
        int authUserId = CredentialsExtractor.getUserId(credentials);

        // Check if user can borrow the book
        Map<String,Boolean> isUserCanBorrow = borrowService.isUserCanBorrow(authUserId,bookId);
        if(isUserCanBorrow.get("userAlreadyBorrowed"))
            return ResponseEntity.ok(new ResponseDTO("User already borrowed a book.",HttpStatus.BAD_REQUEST));
        if(isUserCanBorrow.get("bookAlreadyBorrowed"))
            return ResponseEntity.ok(new ResponseDTO("Book already borrowed by another user.",HttpStatus.BAD_REQUEST));
        if(isUserCanBorrow.get("userExceedLimit"))
            return ResponseEntity.ok(new ResponseDTO("User exceed the limit of borrowed books.",HttpStatus.BAD_REQUEST));
        if(isUserCanBorrow.get("userAlreadyRequested"))
            return ResponseEntity.ok(new ResponseDTO("User already requested for this book.",HttpStatus.BAD_REQUEST));
        if (isUserCanBorrow.get("isUserNotSubscribed"))
            return ResponseEntity.ok(new ResponseDTO("User is not subscribed.",HttpStatus.BAD_REQUEST));

        borrowService.requestBorrow(authUserId,bookId);
        return ResponseEntity.ok(new ResponseDTO("Borrow request sent successfully.", HttpStatus.OK));
    }

    @AuthorizationRequired
    @GetMapping("/{borrowBookId}/return")
    public ResponseEntity<ResponseDTO> returnBorrow(@PathVariable("borrowBookId") int borrowBookId,@RequestHeader("credentials") String credentials) {
        int authUserId = CredentialsExtractor.getUserId(credentials);
        borrowService.returnBorrow(authUserId,borrowBookId);
        return ResponseEntity.ok(new ResponseDTO("Book returned successfully.", HttpStatus.OK));
    }

}
