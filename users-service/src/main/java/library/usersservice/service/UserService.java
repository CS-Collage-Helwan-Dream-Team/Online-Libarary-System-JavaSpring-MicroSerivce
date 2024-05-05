package library.usersservice.service;

import library.usersservice.model.User;
import library.usersservice.repository.UserRepository;
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

    public Optional<User> findById(Integer id){
        return userRepository.findById(id);
    }
    public int count(){
        return (int) userRepository.count();
    }
}
