package library.borrow_service.resources;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BorrowedBookResource {
    private String BookName;
    private String AuthorName;
    private int BorrowRecordId;
    private Instant BorrowedAt;
    private Instant ReturnedAt;
}
