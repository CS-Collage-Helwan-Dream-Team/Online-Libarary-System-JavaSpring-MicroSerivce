package com.example.PaymentService.aspects;


import com.example.PaymentService.enums.UserRole;
import com.example.PaymentService.exceptions.UnauthorizedException;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AuthorizationAspect {

    @Before(value = "@annotation(com.example.PaymentService.annotations.AuthorizationRequired) && execution(* com.example.PaymentService.controller.*.*(..)) && args(.., credentials)")
    public void authorize(String credentials) {
        String[] parts = credentials.split(",");
        String userRole = null;
        String userId = null;
        for (String part : parts) {
            String[] keyValue = part.split("=");
            if (keyValue.length == 2) {
                if (keyValue[0].trim().equalsIgnoreCase("userRole")) {
                    userRole = keyValue[1].trim();
                } else if (keyValue[0].trim().equalsIgnoreCase("userId")) {
                    userId = keyValue[1].trim();
                }
            }
        }
        System.out.println("User Role: " + userRole);
        System.out.println("User ID: " + userId);
        if (userRole != null && userId != null && !userId.isEmpty() && !(userRole.equalsIgnoreCase(UserRole.USER.toString()) || userRole.equalsIgnoreCase(UserRole.LIBRARIAN.toString()))) {
            throw new UnauthorizedException("User is not authorized");
        }
    }
}
