package ru.ilia.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;
import ru.ilia.app.controller.entities.WsPointsRequest;
import ru.ilia.app.controller.entities.WsOnePointRequest;
import ru.ilia.app.controller.entities.WsPointsResponse;
import ru.ilia.app.controller.entities.WsOnePointResponse;
import ru.ilia.app.service.DataService;

import javax.validation.Valid;
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
    @ResponseBody
    public ResponseEntity<?> onGetResult(@Valid @RequestBody WsOnePointRequest request) {
        try {
            String ksi = request.getKsi();
            String mass = request.getMass();
            String result = dataService.getResult(ksi, mass);
            // create response
            return ResponseEntity.ok(new WsOnePointResponse(ksi, mass, result));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @MessageMapping("/get-data-all")
    @SendToUser("/data-all/reply")
    @ResponseBody
    public WsPointsResponse onGetAllResults(@Valid @RequestBody WsPointsRequest request) {
        // -> deserialize Response
        String ksi = request.getKsi();
        Map<String, String> result = dataService.getAllResults(ksi);
        // create response -> serialize Response class
        return new WsPointsResponse(ksi, result);
    }

    @ExceptionHandler(NullPointerException.class)
    public String databaseError() {
        return "databaseError";
    }
}
