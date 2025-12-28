package com.example.chat.controller;

import com.example.chat.model.Message_;
import com.example.chat.repository.MessageRepo;
import com.example.chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MessageController {
    @Autowired
    private MessageService messageService;
    @PostMapping("/message")
    private Message_ save(@RequestBody Message_ m){

        return messageService.save(m);
    }
    @GetMapping("/message/{from}/{to}")
    public List<Message_> getAllMessages(@PathVariable String from, @PathVariable String to){
        return messageService.getAllMessages(from,to);
    }
}
