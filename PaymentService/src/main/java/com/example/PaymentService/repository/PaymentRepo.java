package com.example.PaymentService.repository;

import com.example.PaymentService.models.entities.PaymentHistory;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepo extends JpaRepository<PaymentHistory, Integer>{
}
