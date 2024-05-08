package com.example.PaymentService.models.DTOs;

import com.example.PaymentService.models.entities.PaymentHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDTO {
    private Integer id;

//    @NotNull(message = "User ID is required")
    private Integer userId;

//    @NotNull(message = "Card number is required")
//    @Pattern(regexp = "^[0-9]*$", message = "Card number must be a number")
    private String cardNumber;

//    @NotNull(message = "Amount is required")
//    @Pattern(regexp = "^[0-9]*$", message = "Amount must be a number")
    private Double amount;

    public static PaymentDTO from(PaymentHistory entity){
        return PaymentDTO.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .cardNumber(entity.getCardNumber())
                .amount(entity.getAmount())
                .build();
    }
}
