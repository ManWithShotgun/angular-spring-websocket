package ru.ilia.app.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import ru.ilia.app.service.DataService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
public class WebSocketController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final DataService dataService;

    @Autowired
    WebSocketController(SimpMessagingTemplate template, SimpMessageSendingOperations messagingTemplate, DataService dataService) {
        this.messagingTemplate = messagingTemplate;
        this.dataService = dataService;
    }

    @MessageMapping("/send/message")
    @SendToUser("/chat/reply")
    public String onReceivedMesage(@Payload String message) {
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

    @MessageMapping("/get-data-all")
    @SendToUser("/data-all/reply")
    public String onGetAllResults(String jsonRequest) throws IOException {
        // -> deserialize Response
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(jsonRequest);
        String ksi = jsonNode.get("ksi").asText();
        Map<String, String> result = dataService.getAllResults(ksi);
        // create response -> serialize Response class
        ObjectNode objectNode = mapper.createObjectNode();
        objectNode.put("ksi", ksi);
        ArrayList<JsonNode> jsonNodes = new ArrayList<>(result.size());
        for (Map.Entry<String, String> entry : result.entrySet()) {
            ArrayNode point = mapper.createArrayNode();
            point.add(entry.getKey());
            point.add(entry.getValue());
            jsonNodes.add(point);
        }
        objectNode.putArray("result").addAll(jsonNodes);
        return objectNode.toString();
    }
}
