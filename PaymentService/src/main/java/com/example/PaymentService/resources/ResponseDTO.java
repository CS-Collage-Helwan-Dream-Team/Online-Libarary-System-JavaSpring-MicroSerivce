package com.example.PaymentService.resources;

import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

public class ResponseDTO {
    public String message;
    public int status;
    public Map<String, Object> data = new HashMap<>();

    public ResponseDTO(String message) {
        this.message = message;
    }

    public ResponseDTO(String message, HttpStatus status) {
        this.message = message;
        this.status = status.value();
    }

    public ResponseDTO(String message, HttpStatus status, Object data) {
        this.message = message;
        this.status = status.value();
        this.data = (Map<String, Object>) data;
    }

    public void addData(String key, Object value) {
        this.data.put(key, value);
    }
}

