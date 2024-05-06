package com.example.demo.Sub.controllers;

import com.example.demo.Sub.Request.SubscriberRequest;
import com.example.demo.Sub.services.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/subscription")
public class SubController {

    private final SubscriptionService subscriptionService;
    @Autowired
    public SubController(SubscriptionService subscriptionService){
        this.subscriptionService = subscriptionService;
    }

    @PostMapping(path = "addSubscriber")
    public ResponseEntity<String> addSubscriber(@RequestBody SubscriberRequest subscriberRequest){
        try {
            subscriptionService.addSubscriber(subscriberRequest);
            return ResponseEntity.ok("Subscriber added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding subscriber");
        }

    }


    @GetMapping (path = "checkSubscriber")
    public Integer checkSubscriber(@RequestParam int userId){
        return subscriptionService.checkSubscriber(userId) ;

    }
}
