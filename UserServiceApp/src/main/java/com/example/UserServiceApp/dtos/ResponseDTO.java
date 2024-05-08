package com.example.UserServiceApp.dtos;

import org.springframework.http.HttpStatus;

import java.util.HashMap;

public class ResponseDTO {
    public String message;
    public int status;
    public Object data = new HashMap<>();

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
        this.data = data;
    }
}
