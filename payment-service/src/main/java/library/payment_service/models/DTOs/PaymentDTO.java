package library.payment_service.models.DTOs;

import library.payment_service.models.entities.PaymentHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDTO {
    private Integer id;

    @NotNull(message = "User ID is required")
    @NotBlank(message = "User ID is required")
    private Integer userId;

    @NotBlank(message = "Card number is required")
    @NotNull(message = "Card number is required")
    @Pattern(regexp = "^[0-9]*$", message = "Card number must be a number")
    private String cardNumber;

    @NotNull(message = "Amount is required")
    @NotBlank(message = "Amount is required")
    @Pattern(regexp = "^[0-9]*$", message = "Amount must be a number")
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
