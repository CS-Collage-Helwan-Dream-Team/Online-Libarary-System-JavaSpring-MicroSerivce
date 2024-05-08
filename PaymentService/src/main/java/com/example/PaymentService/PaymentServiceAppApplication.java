package com.example.PaymentService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class PaymentServiceAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentServiceAppApplication.class, args);
	}

}
