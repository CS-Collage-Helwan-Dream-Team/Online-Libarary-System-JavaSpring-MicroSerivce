//package com.example.demo.test;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.time.LocalDate;
//
//@Configuration
//public class BookConfig {
//
//    @Bean
//    CommandLineRunner commandLineRunner(BookRepository bookRepository) {
//        return args -> {
//            // Create a book
//            Book book1 = new Book(
//                    1,
//                    "The Great Gatsby",
//                    "F. Scott Fitzgerald",
//                    "9780743273565",
//                    1,
//                    "The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.",
//                    true,
//                    1,
//                    "https://images-na.ssl-images-amazon.com/images/I/51ZJ2q4%2B1NL._SX331_BO1,204,203,200_.jpg",
//                    null // Category will be set separately
//            );
//
//            // Create a category
//            Category category1 = new Category(
//                    1,
//                    "Novel",
//                    LocalDate.of(2021, 1, 1) // Use LocalDate.of to create a LocalDate object
//            );
//
//            // Set the category for the book
//            book1.setCategory(category1);
//
//            // Save the book
//            bookRepository.save(book1);
//        };
//    }
//}
