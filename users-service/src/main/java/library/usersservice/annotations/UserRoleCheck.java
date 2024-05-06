package library.usersservice.annotations;

import library.usersservice.enums.UserRole;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UserRoleCheck {
    UserRole value() default UserRole.USER; // Default to USER role
}
