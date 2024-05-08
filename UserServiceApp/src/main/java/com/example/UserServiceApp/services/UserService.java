package com.example.UserServiceApp.services;

import com.example.UserServiceApp.enums.UserStatus;
import com.example.UserServiceApp.models.User;
import com.example.UserServiceApp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<User> getALl(){
        return userRepository.findAll();
    }

    public User update (User user) {
        userRepository.save(user);
        return user;
    }

    public void delete (User user){
        userRepository.delete(user);
    }
}
