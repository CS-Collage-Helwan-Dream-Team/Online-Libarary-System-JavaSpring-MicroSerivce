package com.example.BorrowingServiceApp.controller;

import com.example.BorrowingServiceApp.annotations.AuthorizationRequired;
import com.example.BorrowingServiceApp.annotations.UserRoleCheck;
import com.example.BorrowingServiceApp.enums.UserRole;
import com.example.BorrowingServiceApp.helpers.CredentialsExtractor;
import com.example.BorrowingServiceApp.resources.BorrowRequestResources;
import com.example.BorrowingServiceApp.resources.BorrowedBookResource;
import com.example.BorrowingServiceApp.resources.ResponseDTO;
import com.example.BorrowingServiceApp.services.BorrowService;
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
        ResponseDTO responseDTO =new ResponseDTO("Borrow requests retrieved successfully.", HttpStatus.OK);
        responseDTO.addData("borrowRequests",borrowRequests);
        return ResponseEntity.ok(responseDTO);
    }

    @AuthorizationRequired
    @GetMapping("/history")
    public ResponseEntity<ResponseDTO> userHome(@RequestHeader("credentials") String credentials) {
        int authUserId = CredentialsExtractor.getUserId(credentials);
        List<BorrowedBookResource> borrowRequests = borrowService.getUserBorrowedBooks(authUserId);
        ResponseDTO responseDTO =new ResponseDTO("Borrow history retrieved successfully.", HttpStatus.OK);
        responseDTO.addData("borrowHistory",borrowRequests);
        return ResponseEntity.ok(responseDTO);
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
