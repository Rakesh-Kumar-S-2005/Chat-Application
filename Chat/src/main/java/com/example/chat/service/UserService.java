package com.example.chat.service;

import com.example.chat.model.User;
import com.example.chat.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    public List<User> findAll() {
        return userRepo.findAll();
    }
    public User post(User user) {
        return userRepo.save(user);
    }
}
