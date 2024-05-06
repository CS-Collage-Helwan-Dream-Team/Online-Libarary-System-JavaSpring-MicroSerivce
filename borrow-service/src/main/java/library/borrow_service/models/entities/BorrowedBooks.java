package library.borrow_service.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import library.borrow_service.models.DTOs.BorrowedBookDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "borrowed_books")
public class BorrowedBooks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "Id", insertable = false, updatable = false)
    private Book book;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "request_id", referencedColumnName = "id", insertable = true, updatable = true)
    private BorrowRequest request;

    @Column(name = "borrowed_at", nullable = false)
    private Instant borrowedAt;

    @Column(name = "returned_at")
    private Instant returnedAt;

    @PrePersist
    public void prePersist() {
        this.borrowedAt = Instant.now();
    }

    public static BorrowedBookDTO toDTO(BorrowedBooks borrowedBooks) {
        return BorrowedBookDTO.builder()
                .id(borrowedBooks.getId())
                .book(borrowedBooks.getBook())
                .userId(borrowedBooks.getUserId())
                .request(borrowedBooks.getRequest())
                .borrowedAt(borrowedBooks.getBorrowedAt())
                .returnedAt(borrowedBooks.getReturnedAt())
                .build();
    }

}