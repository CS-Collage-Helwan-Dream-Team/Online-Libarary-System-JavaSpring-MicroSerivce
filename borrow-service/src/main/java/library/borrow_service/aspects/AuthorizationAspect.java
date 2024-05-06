package library.borrow_service.aspects;

import library.borrow_service.enums.UserRole;
import library.borrow_service.exceptions.UnauthorizedException;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AuthorizationAspect {

    @Before(value = "@annotation(library.borrow_service.annotations.AuthorizationRequired) && execution(* library.borrow_service.controllers.*.*(..)) && args(.., credentials)")
    public void authorize(String credentials) {
        if (credentials == null || credentials.isEmpty()) {
            throw new UnauthorizedException("User is not authorized");
        }
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
        if ((userRole == null || userRole.isEmpty() || !(userRole.equalsIgnoreCase(UserRole.USER.toString()) || userRole.equalsIgnoreCase(UserRole.LIBRARIAN.toString())))
                || (userId == null || userId.isEmpty())) {
            throw new UnauthorizedException("User is not authorized");
        }
    }
}
