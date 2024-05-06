package library.borrow_service.repositories;

import library.borrow_service.models.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepo extends JpaRepository<Book, Integer>{
}
