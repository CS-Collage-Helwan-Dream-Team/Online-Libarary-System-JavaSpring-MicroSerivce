import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook as deleteBookApi } from "@/services/libirarianBookApi";

export function useDeleteBook() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteBook } = useMutation({
        mutationFn: (id) => {
            return deleteBookApi(id);
        },
        onSuccess: (success) => {
            toast.success(success?.message);

            queryClient.invalidateQueries({
                queryKey: ["books"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteBook };
}
