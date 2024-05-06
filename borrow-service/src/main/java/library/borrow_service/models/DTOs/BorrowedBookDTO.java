package library.borrow_service.models.DTOs;

import library.borrow_service.models.entities.Book;
import library.borrow_service.models.entities.BorrowRequest;
import library.borrow_service.models.entities.BorrowedBooks;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BorrowedBookDTO {

    private Integer id;

    private Book book;

    private Integer userId;

    private BorrowRequest request;

    private Instant borrowedAt;

    private Instant returnedAt;

    public static BorrowedBooks toEntity(BorrowedBookDTO borrowedBookDTO) {
        return BorrowedBooks.builder()
                .id(borrowedBookDTO.getId())
                .book(borrowedBookDTO.getBook())
                .userId(borrowedBookDTO.getUserId())
                .request(borrowedBookDTO.getRequest())
                .borrowedAt(borrowedBookDTO.getBorrowedAt())
                .returnedAt(borrowedBookDTO.getReturnedAt())
                .build();
    }
}
