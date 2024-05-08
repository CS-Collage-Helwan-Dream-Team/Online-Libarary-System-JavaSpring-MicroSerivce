package com.example.PaymentService.services;

import com.example.PaymentService.models.DTOs.PaymentDTO;
import com.example.PaymentService.models.entities.PaymentHistory;
import com.example.PaymentService.repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepo paymentRepo;

    public int savePayment(PaymentDTO paymentDTO) {
        PaymentHistory savedPaymentHistory = paymentRepo.save(PaymentHistory.from(paymentDTO));
        return savedPaymentHistory.getId();
    }
}
