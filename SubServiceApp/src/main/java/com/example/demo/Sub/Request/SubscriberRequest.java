package com.example.demo.Sub.Request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SubscriberRequest {

    private int userId;
    private int paymentId;
    private LocalDate startDate;

}
