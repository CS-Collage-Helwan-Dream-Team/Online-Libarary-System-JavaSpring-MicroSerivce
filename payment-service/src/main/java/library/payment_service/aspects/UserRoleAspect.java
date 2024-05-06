package library.payment_service.aspects;

import library.payment_service.annotations.UserRoleCheck;
import library.payment_service.exceptions.ForbiddenException;
import library.payment_service.exceptions.UnauthorizedException;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class UserRoleAspect {

    @Before("@annotation(userRoleCheck) && execution(* library.payment_service.controllers.*.*(..))  && args(.., credentials)")
    public void checkUserRole(UserRoleCheck userRoleCheck, String credentials) {
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

        if (userRole != null && !userRole.equalsIgnoreCase(userRoleCheck.value().toString())) {
            throw new ForbiddenException("User is not authorized to access this resource");
        }
    }
}