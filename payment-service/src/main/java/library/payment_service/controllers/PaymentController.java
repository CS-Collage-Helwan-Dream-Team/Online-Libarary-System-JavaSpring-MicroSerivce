package library.payment_service.controllers;

import library.payment_service.annotations.AuthorizationRequired;
import library.payment_service.requests.PaymentRequest;
import library.payment_service.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @AuthorizationRequired
    @PostMapping("pay")
    public String pay(@RequestHeader("credentials") String credentials, @RequestBody PaymentRequest paymentRequest){
        return "Payment successful";
    }
}
