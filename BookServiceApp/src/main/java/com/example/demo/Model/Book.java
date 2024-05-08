package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String authorName;
    @Column(nullable = false)
    private String isbn;
    @Column(nullable = false)
    private int rackNumber;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private Boolean isAvailable;
    @Column(nullable = false)
    private int categoryId;
    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "categoryId", referencedColumnName = "Id", insertable = false, updatable = false)
    private Category category;
}
