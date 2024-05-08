package com.example.BorrowingServiceApp.models.entities;

import com.example.BorrowingServiceApp.models.DTOs.BorrowRequestDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.jetbrains.annotations.NotNull;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "borrow_book_requests")
public class BorrowRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "Id")
    private Book book;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @NotNull
    @ColumnDefault("'pending'")
    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @Column(name = "requested_at", nullable = false)
    private Instant requestedAt;

    @PrePersist
    public void prePersist() {
        this.requestedAt = Instant.now();
    }

    public static BorrowRequestDTO toDTO(BorrowRequest borrowRequest) {
        return BorrowRequestDTO.builder()
                .id(borrowRequest.getId())
                .book(borrowRequest.getBook())
                .userId(borrowRequest.getUserId())
                .status(borrowRequest.getStatus())
                .requestedAt(borrowRequest.getRequestedAt())
                .build();
    }

}