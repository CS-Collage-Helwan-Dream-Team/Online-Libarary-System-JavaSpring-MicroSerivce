package library.borrow_service.resources;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowRequestResources {
    private String BookName;
    private String RequestUserName;
    private String Status;
    private Instant RequestedAt;
}
