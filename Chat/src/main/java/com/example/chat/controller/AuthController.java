package com.example.chat.controller;

import com.example.chat.model.User;
import com.example.chat.repository.UserRepo;
import com.example.chat.service.UserService;
import com.example.chat.util.JwtUtil;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepo ur;
    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user)
    {
        String roll_no= user.getRollNo();
        String password=user.getPassword();
        if(!ur.findByRollNo(roll_no).isPresent())
        {
            user.setPassword(passwordEncoder.encode(password));
            userService.post(user);
//            String token = jwtUtil.generateToken(user.getRollNo());
            return new ResponseEntity<>("Created a user", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        }

    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User u = ur.findByRollNo(user.getRollNo())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        if (!passwordEncoder.matches(user.getPassword(), u.getPassword())) {
            return new ResponseEntity<>("Wrong Password", HttpStatus.UNAUTHORIZED);
        }

        String token = jwtUtil.generateToken(u.getRollNo());
        return ResponseEntity.ok(token);
    }
}
