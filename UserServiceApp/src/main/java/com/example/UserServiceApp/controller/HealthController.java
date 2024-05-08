package com.example.UserServiceApp.controller;

import com.example.UserServiceApp.dtos.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("api/health")
    public ResponseEntity<ResponseDTO> health() {
        return ResponseEntity.ok(new ResponseDTO(
                "Service works fine ! ",
                HttpStatus.OK
        ));
    }
}
