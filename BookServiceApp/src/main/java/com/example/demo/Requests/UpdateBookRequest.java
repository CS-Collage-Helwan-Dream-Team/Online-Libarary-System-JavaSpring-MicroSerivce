package com.example.demo.Requests;

import com.example.demo.Model.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBookRequest {

    private String title;
    private String authorName;
    private String isbn;
    private int rackNumber;
    private String description;
    private Boolean isAvailable;
    private int categoryId;
    private String imageUrl;
    private Category category;
}