package library.payment_service.controllers;

import library.payment_service.annotations.AuthorizationRequired;
import library.payment_service.annotations.UserRoleCheck;
import library.payment_service.enums.UserRole;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/payments")
public class TestController {

    @AuthorizationRequired
    @UserRoleCheck(UserRole.LIBRARIAN)
    @GetMapping("/adminEndpoint")
    public String adminEndpoint(@RequestHeader("credentials") String credentials) {
        // Your logic for admin endpoint
        return "This is an admin endpoint";
    }

    @AuthorizationRequired
    @UserRoleCheck(UserRole.USER)
    @GetMapping("/userEndpoint")
    public String userEndpoint(@RequestHeader("credentials") String credentials) {
        // Your logic for user endpoint
        return "This is a user endpoint";
    }
    @AuthorizationRequired
    @GetMapping("/authEndpoint")
    public String adminEndpoint2(@RequestHeader("credentials") String credentials) {
        // Your logic for admin endpoint
        return "This is an auth endpoint";
    }

}