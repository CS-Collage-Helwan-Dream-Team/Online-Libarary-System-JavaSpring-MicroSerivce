package com.example.BorrowingServiceApp.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books")
public class Book {

    @Id
    @SequenceGenerator(
            name = "book_sequence",
            sequenceName = "book_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "book_sequence"
    )
    private int id;

    private String title;
    private String authorName;
    private String isbn;
    private int rackNumber;
    private String description;
    private Boolean isAvailable;
    private int categoryId;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "categoryId", referencedColumnName = "Id", insertable = false, updatable = false)
    private Category category;
}