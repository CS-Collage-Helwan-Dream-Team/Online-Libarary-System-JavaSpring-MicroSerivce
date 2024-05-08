import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserMaxBorrowBooks } from "@/services/adminUsersManagementApis";

export function useUpdateMaxBorrowBooks() {
	const queryClient = useQueryClient();

	const { isPending: isUpdating, mutate: updateMaxBorrowBooks } = useMutation({
		mutationFn: ({ id, maxBorrowedBooks }) => {
			return updateUserMaxBorrowBooks(id, maxBorrowedBooks);
		},
		onSuccess: (success) => {
			toast.success(success?.message);

			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateMaxBorrowBooks };
}
