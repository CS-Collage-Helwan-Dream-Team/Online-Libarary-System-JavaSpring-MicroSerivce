package com.example.demo.Sub.models;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table (name = "subscription")
public class SubModel {
    @Id
    @SequenceGenerator(
            name = "subscription_sequence",
            sequenceName = "subscription_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "subscription_sequence"
    )
    private int id ;
    @Column(nullable = false)
    private int userId ;
    @Column(nullable = false)
    private int paymentId ;
    private LocalDate startDate;
}

