import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { borrowBook as borrowBookApi } from "@/services/userBookApis";

export function useBorrowBook() {
    const queryClient = useQueryClient();

    const { mutate: borrowBook, isPending: isBorrowing } = useMutation({
        mutationFn: (id) => {
            return borrowBookApi(id);
        },
        onSuccess: (success) => {
            toast.success(success?.message);

            queryClient.invalidateQueries({
                queryKey: ["books"],
            });
        },
        onError: (err) => toast.error(err.message),
    });
    return { isBorrowing, borrowBook };
}
