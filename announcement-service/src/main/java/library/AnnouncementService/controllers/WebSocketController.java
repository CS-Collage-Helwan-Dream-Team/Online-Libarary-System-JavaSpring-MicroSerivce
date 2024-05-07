package library.AnnouncementService.controllers;

import library.AnnouncementService.DTOs.MessageDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@CrossOrigin(origins = "*")
public class WebSocketController {

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public MessageDTO sendMessage(@Payload MessageDTO message) {
        return message;
    }
}

