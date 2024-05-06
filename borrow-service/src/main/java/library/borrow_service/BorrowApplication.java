package library.borrow_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@EnableAspectJAutoProxy
@SpringBootApplication

public class BorrowApplication {

	public static void main(String[] args) {
		SpringApplication.run(BorrowApplication.class, args);
	}

}
