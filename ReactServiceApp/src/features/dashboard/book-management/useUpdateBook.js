import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook as updateBookApi } from "@/services/libirarianBookApi";

export function useUpdateBook(setError) {
    const queryClient = useQueryClient();

    const { isPending: isUpdating, mutate: updateBook } = useMutation({
        mutationFn: (bookData) => {
            return updateBookApi(bookData, setError);
        },
        onSuccess: (success) => {
            toast.success(success?.message);

            queryClient.invalidateQueries({
                queryKey: ["books"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, updateBook };
}
