package ru.ilia.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class WebSocketController {

    private final SimpMessageSendingOperations messagingTemplate;

    @Autowired
    WebSocketController(SimpMessagingTemplate template, SimpMessageSendingOperations messagingTemplate){
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/send/message")
    @SendToUser("/chat/reply")
    public String onReceivedMesage(@Payload String message){
//        this.template.convertAndSend("/chat",  new SimpleDateFormat("HH:mm:ss").format(new Date())+"- "+message);
        return "rrr: " + message;
    }
}
