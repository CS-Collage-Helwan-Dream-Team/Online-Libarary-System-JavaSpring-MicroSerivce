package library.payment_service.repositories;

import library.payment_service.models.entities.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepo extends JpaRepository<PaymentHistory, Integer>{
}
