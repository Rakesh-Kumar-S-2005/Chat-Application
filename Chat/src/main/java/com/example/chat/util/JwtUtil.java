package com.example.chat.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private  final String SECRET="Rakesh Kumar Sudhakar jdsshissighoshgorhouehgoeg";
    private final long EXPIRATION_TIME=100*60*60;
    private final Key secretKey= Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    public String generateToken(String rollNo){
        return Jwts.builder()
                .setSubject(rollNo)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractRoll_no(String token){
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token).getBody().getSubject();
    }
    public boolean validateToken(String token){
        try
        {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return true;
        }catch (Exception e)
        {
            return false;
        }
    }
}
