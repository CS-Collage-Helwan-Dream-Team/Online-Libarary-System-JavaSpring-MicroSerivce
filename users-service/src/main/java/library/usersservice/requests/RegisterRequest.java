package library.usersservice.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "Please enter an email")
    @Size(min = 6 , max = 50 , message = "Email must be between 6 and 50 characters")
    private String email;

    @NotBlank(message = "Please enter a password")
    @Size(min = 6 , max = 50 , message = "Password must be between 6 and 50 characters")
    private String password;

    @NotBlank(message = "Please enter a valid role ( user - librarian )")
    @Size(min = 3 , max = 10 , message = "Role size must be between 6 and 50 characters")
    private String role;

    @NotBlank(message = "Please enter a username")
    @Size(min = 3 , max = 10 , message = "Role size must be between 6 and 50 characters")
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
