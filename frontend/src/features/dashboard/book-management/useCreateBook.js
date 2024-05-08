import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook as createBookApi } from "@/services/libirarianBookApi";

export function useCreateBook(setError) {
    const queryClient = useQueryClient();

    const { isPending: isCreating, mutate: createBook } = useMutation({
        mutationFn: (bookData) => {
            return createBookApi(bookData, setError);
        },
        onSuccess: (success) => {
            toast.success(success?.message);

            queryClient.invalidateQueries({
                queryKey: ["books"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isCreating, createBook };
}
