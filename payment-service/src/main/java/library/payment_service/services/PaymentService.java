package library.payment_service.services;

import library.payment_service.models.DTOs.PaymentDTO;
import library.payment_service.models.entities.PaymentHistory;
import library.payment_service.repositories.PaymentRepo;
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
