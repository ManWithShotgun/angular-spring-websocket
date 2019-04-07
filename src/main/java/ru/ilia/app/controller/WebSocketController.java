package ru.ilia.app.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import ru.ilia.app.service.DataService;

import java.io.IOException;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class WebSocketController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final DataService dataService;

    @Autowired
    WebSocketController(SimpMessagingTemplate template, SimpMessageSendingOperations messagingTemplate, DataService dataService){
        this.messagingTemplate = messagingTemplate;
        this.dataService = dataService;
    }

    @MessageMapping("/send/message")
    @SendToUser("/chat/reply")
    public String onReceivedMesage(@Payload String message){
//        this.template.convertAndSend("/chat",  new SimpleDateFormat("HH:mm:ss").format(new Date())+"- "+message);
        return "rrr: " + message;
    }

    @MessageMapping("/get-data")
    @SendToUser("/data/reply")
    public String onGetResult(String jsonRequest) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonRequest);
        String ksi = jsonNode.get("ksi").asText();
        String mass = jsonNode.get("mass").asText();
        String result = dataService.getResult(ksi, mass);
        // create response
        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.put("ksi", ksi);
        objectNode.put("mass", mass);
        objectNode.put("result", result);
        return objectNode.toString();
    }
}
