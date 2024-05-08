package com.example.BorrowingServiceApp.models.DTOs;

import com.example.BorrowingServiceApp.models.entities.Book;
import com.example.BorrowingServiceApp.models.entities.BorrowRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BorrowRequestDTO {

    private Integer id;

    private Book book;

    private Integer userId;

    private String status;

    private Instant requestedAt;

    public static BorrowRequest toEntity(BorrowRequestDTO borrowRequestDTO) {
        return BorrowRequest.builder()
                .id(borrowRequestDTO.getId())
                .book(borrowRequestDTO.getBook())
                .userId(borrowRequestDTO.getUserId())
                .status(borrowRequestDTO.getStatus())
                .requestedAt(borrowRequestDTO.getRequestedAt())
                .build();
    }
}
