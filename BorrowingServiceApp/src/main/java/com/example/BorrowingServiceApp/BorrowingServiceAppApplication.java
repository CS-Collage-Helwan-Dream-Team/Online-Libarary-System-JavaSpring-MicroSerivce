package com.example.BorrowingServiceApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class BorrowingServiceAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(BorrowingServiceAppApplication.class, args);
	}

}
