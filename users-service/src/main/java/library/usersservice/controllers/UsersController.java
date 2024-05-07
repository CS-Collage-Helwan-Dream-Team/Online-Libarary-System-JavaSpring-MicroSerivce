package library.usersservice.controllers;

import jakarta.validation.Valid;
import library.usersservice.annotations.AuthorizationRequired;
import library.usersservice.annotations.UserRoleCheck;
import library.usersservice.dtos.ResponseDTO;
import library.usersservice.enums.UserRole;
import library.usersservice.models.User;
import library.usersservice.requests.UpdateUserRequest;
import library.usersservice.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

@RestController
public class UsersController {
    private final UserService userService;

    public UsersController(
            UserService userService
    ) {
        this.userService = userService;
    }

    @AuthorizationRequired
    @UserRoleCheck(UserRole.LIBRARIAN)
    @GetMapping("/api/librarian/users")
    public ResponseEntity<ResponseDTO> Index(){
        List<User> allUsers = userService.getALl();

        return ResponseEntity.status(HttpStatus.OK)
                .body(
                        new ResponseDTO(
                                "Users retrieved succesfully.",
                                HttpStatus.OK,
                                new HashMap<String , List<User>>(){{
                                    put("users", allUsers);
                                }}
                        )
                );
    }

    @AuthorizationRequired
    @UserRoleCheck(UserRole.LIBRARIAN)
    @PatchMapping("/api/librarian/users/{Id}")
    public ResponseEntity<ResponseDTO> Update(@PathVariable Integer Id , @Valid @RequestBody UpdateUserRequest request){

        User existingUser = userService.findById(Id);

        if(existingUser == null){
            return ResponseEntity.badRequest()
                    .body(
                            new ResponseDTO(
                                    "User not found.",
                                    HttpStatus.BAD_REQUEST
                            )
                    );
        }

        existingUser.setEmail(request.getEmail() != null ? request.getEmail() : existingUser.getEmail());
        existingUser.setRole(request.getRole() != null ? request.getRole() : existingUser.getRole());
        existingUser.setMaxBorrowedBooks(request.getMaxBorrowedBooks() != 0 ? request.getMaxBorrowedBooks() : existingUser.getMaxBorrowedBooks());
        existingUser.setUsername(request.getUsername() != null ? request.getUsername() : existingUser.getUsername());

        User updatedUser = userService.update(existingUser);

        return ResponseEntity.status(HttpStatus.OK)
                .body(
                        new ResponseDTO(
                                "User updated succesfully.",
                                HttpStatus.OK,
                                new HashMap<String , Object>(){{
                                    put("user", updatedUser);
                                }}
                        )
                );
    }

    @AuthorizationRequired
    @UserRoleCheck(UserRole.LIBRARIAN)
    @DeleteMapping("/api/librarian/users/{Id}")
    public ResponseEntity<ResponseDTO> Delete(@PathVariable Integer Id){
        User existingUser = userService.findById(Id);
        if(existingUser == null){
            return ResponseEntity.badRequest()
                    .body(
                            new ResponseDTO(
                                    "User not found.",
                                    HttpStatus.BAD_REQUEST
                            )
                    );
        }

        userService.delete(existingUser);

        return ResponseEntity.status(HttpStatus.OK)
                .body(
                        new ResponseDTO(
                                "User deleted succesfully.",
                                HttpStatus.OK
                        )
                );
    }
}
