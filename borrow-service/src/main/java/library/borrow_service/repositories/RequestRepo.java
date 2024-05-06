package library.borrow_service.repositories;

import library.borrow_service.models.entities.BorrowRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepo extends JpaRepository<BorrowRequest, Integer>{
    boolean existsByUserIdAndBookIdAndStatus(Integer userId, Integer bookId, String status);
}
