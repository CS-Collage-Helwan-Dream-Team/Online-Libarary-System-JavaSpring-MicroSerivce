package library.usersservice;

import library.usersservice.model.User;
import library.usersservice.request.LoginRequest;
import library.usersservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Objects;

@RestController
public class UsersController {

    private final UserService userService;
    public UsersController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("api/auth/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequest request) {
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
                        "Logged in",
                        HttpStatus.OK,
                        new HashMap<String , Object>(){{
                            put("user", user);
                        }}
                )
        );
    }



    @PostMapping("api/auth/register")
    public ResponseEntity<String> register(){

        return ResponseEntity.ok("Ok");
    }
}
