package com.example.PaymentService.controller;

import com.example.PaymentService.annotations.AuthorizationRequired;
import com.example.PaymentService.models.DTOs.PaymentDTO;
import com.example.PaymentService.resources.ResponseDTO;
import com.example.PaymentService.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/payment")
public class PaymentController {

    private final PaymentService paymentService;
    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    @AuthorizationRequired
    @PostMapping("pay")
    public ResponseDTO pay(@RequestBody PaymentDTO paymentRequest, @RequestHeader("credentials") String credentials){
        //dummy logic
        if (paymentRequest.getCardNumber().equalsIgnoreCase("2223000048410010")) {
            return new ResponseDTO("Payment failed: No Money :(", HttpStatus.BAD_REQUEST);
        }else if (paymentRequest.getCardNumber().equalsIgnoreCase("2223000048410011")) {
            int paymentId = this.paymentService.savePayment(paymentRequest);
            ResponseDTO responseDTO = new ResponseDTO("Payment successful", HttpStatus.OK);
            responseDTO.addData("paymentId", paymentId);
            return responseDTO;
        }
        return new ResponseDTO("Payment failed", HttpStatus.BAD_REQUEST);
    }
}
