package com.example.UserServiceApp.controller;


import com.example.UserServiceApp.dtos.ResponseDTO;
import com.example.UserServiceApp.enums.UserStatus;
import com.example.UserServiceApp.models.User;
import com.example.UserServiceApp.requests.LoginRequest;
import com.example.UserServiceApp.requests.RegisterRequest;
import com.example.UserServiceApp.services.UserService;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
public class UsersAuthenticationController {

    private final UserService userService;
    public UsersAuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("api/auth/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequest request ) {
        User user = userService.findByEmail(request.getEmail());

        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseDTO(
                    "You donnot have an account",
                    HttpStatus.UNAUTHORIZED
            ));
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseDTO(
                            "Wrong credentials",
                            HttpStatus.UNAUTHORIZED
                    )
            );
        }

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDTO(
                        "Logged in succesfully.",
                        HttpStatus.OK,
                        new HashMap<String , Object>(){{
                            put("user", user);
                        }}
                )
        );
    }

    @PostMapping("api/auth/customer/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody RegisterRequest request){

        User oldUserWithTheSameEmail = userService.findByEmail(request.getEmail());
        if( oldUserWithTheSameEmail != null ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(
                            new ResponseDTO(
                                    "You have allready have an account , please loggin.",
                                    HttpStatus.BAD_REQUEST
                            )
                    );
        }

        User user = new User(
                request.getUsername(),
                request.getPassword(),
                request.getEmail(),
                request.getRole(),
                0,
                request.getRole().equals("libirarian") ? UserStatus.approved.toString() : UserStatus.pending.toString()
        );

        userService.create(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseDTO(
                        "Account created succesfully.",
                        HttpStatus.CREATED,
                        new HashMap<String , Object>(){{
                            put("user", user);
                        }}
                )
        );    }
}
