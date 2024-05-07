package library.usersservice.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest {

    @NotBlank(message = "Please enter an email")
    @Size(min = 6 , max = 50 , message = "Email must be between 6 and 50 characters")
    private String email;

    @NotBlank(message = "Please enter a password")
    @Size(min = 5 , max = 255 , message = "Password must be between 5 and 255 characters")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
