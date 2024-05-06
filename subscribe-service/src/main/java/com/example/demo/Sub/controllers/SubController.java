package com.example.demo.Sub.controllers;

import com.example.demo.Sub.Request.SubscriberRequest;
import com.example.demo.Sub.dtos.ResponseDTO;
import com.example.demo.Sub.models.SubModel;
import com.example.demo.Sub.services.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(path = "api/subscription")
public class SubController {

    private final SubscriptionService subscriptionService;
    @Autowired
    public SubController(SubscriptionService subscriptionService){
        this.subscriptionService = subscriptionService;
    }

    @PostMapping(path = "addSubscriber")
    public ResponseEntity<ResponseDTO> addSubscriber(@RequestBody SubscriberRequest subscriberRequest){

          if ( subscriptionService.addCheckNull(subscriberRequest)) {
              SubModel Subscriber = subscriptionService.addSubscriber(subscriberRequest);
              return ResponseEntity.status(HttpStatus.CREATED).body(
                      new ResponseDTO(
                              "Subscriber added successfully",
                              HttpStatus.CREATED
                      )
              );
          }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDTO(
                            "Error in adding subscriber",
                            HttpStatus.BAD_REQUEST
                    )
            );

    }



    @GetMapping (path = "checkSubscriber")
    public ResponseEntity<ResponseDTO> checkSubscriber(@RequestParam int userId){
        int status =subscriptionService.checkSubscriber(userId) ;

        try {
            if (status==1){
                return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseDTO(
                            "still Subscriber",
                            HttpStatus.CREATED
                    )
            );}
            else if (status==-1){
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        new ResponseDTO(
                                "Not Subscriber",
                                HttpStatus.CREATED
                        )
                );

            }
            else {

                return ResponseEntity.status(HttpStatus.CREATED).body(
                        new ResponseDTO(
                                "His Subscription is expired",
                                HttpStatus.CREATED
                        )
                );
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDTO(
                            "Error in check Subscription",
                            HttpStatus.BAD_REQUEST
                    )
            );

        }

    }


}


