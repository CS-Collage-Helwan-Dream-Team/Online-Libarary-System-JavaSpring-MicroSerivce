package library.payment_service.controllers;

import library.payment_service.annotations.AuthorizationRequired;
import library.payment_service.annotations.UserRoleCheck;
import library.payment_service.enums.UserRole;
import library.payment_service.models.DTOs.PaymentDTO;
import library.payment_service.resources.ResponseDTO;
import library.payment_service.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @AuthorizationRequired
    @PostMapping("pay")
    public ResponseDTO pay(@Valid @RequestBody PaymentDTO paymentRequest,@RequestHeader("credentials") String credentials){
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
