package library.usersservice.services;

import library.usersservice.enums.UserStatus;
import library.usersservice.models.User;
import library.usersservice.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    public User findByEmail(String email){

        return userRepository.findByEmail(email);
    }

    public User findById(Integer id){
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    public User create(User user) {
        return userRepository.save(user);
    }

    public User approve(User user) {
        user.setStatus(UserStatus.approved.toString());
        userRepository.save(user);
        return user;
    }

    public User reject(User user) {
        user.setStatus(UserStatus.rejected.toString());
        userRepository.save(user);
        return user;
    }
}
