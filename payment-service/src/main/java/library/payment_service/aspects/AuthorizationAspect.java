package library.payment_service.aspects;

import library.payment_service.enums.UserRole;
import library.payment_service.exceptions.UnauthorizedException;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.HashMap;
import java.util.Map;

@Aspect
@Component
public class AuthorizationAspect {

    @Before(value = "@annotation(library.payment_service.annotations.AuthorizationRequired) && execution(* library.payment_service.controllers.*.*(..)) && args(.., credentials)")
    public void authorize(String credentials) {
        // Extract user ID and user role from credentials header
        String[] parts = credentials.split(",");
        String userRole = null;
        for (String part : parts) {
            String[] keyValue = part.split("=");
            if (keyValue.length == 2 && keyValue[0].trim().equalsIgnoreCase("userRole")) {
                userRole = keyValue[1].trim();
                break;
            }
        }
        if (userRole != null && !(userRole.equalsIgnoreCase(UserRole.USER.toString()) || userRole.equalsIgnoreCase(UserRole.LIBRARIAN.toString()))) {
            throw new UnauthorizedException("user is not authorized");
        }
    }
}
