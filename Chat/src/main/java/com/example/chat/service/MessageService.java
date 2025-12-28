package com.example.chat.service;

import com.example.chat.model.Message_;
import com.example.chat.repository.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepo mr;

    public Message_ save(Message_ m){
        return mr.save(m);
    }
    public List<Message_> getAllMessages(String user1,String user2){
//        Sort s=Sort.by(Sort.Direction.ASC,"timestamp");
        return mr.getMessages(user1,user2);
    }
}
