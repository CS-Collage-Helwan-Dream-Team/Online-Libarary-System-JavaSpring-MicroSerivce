package library.payment_service.services;

import library.payment_service.models.entities.PaymentHistory;
import library.payment_service.repositories.PaymentRepo;
import library.payment_service.requests.PaymentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepo paymentRepo;

    public int savePayment(PaymentRequest paymentRequest) {
        PaymentHistory savedPaymentHistory = paymentRepo.save(new PaymentHistory(paymentRequest.getAmount(), paymentRequest.getCardNumber(), paymentRequest.getUserId()));
        return savedPaymentHistory.getId();
    }
}
