import { useQuery } from "@tanstack/react-query";
import { getBorrowRequestsHistory } from "@/services/BorrowRequestsHistory";

export function useGetBorrowRequestsHistory() {
	const { isPending: isLoading, data } = useQuery({
		queryKey: ["borrowRequestsHistory"],
		queryFn: () => {
			return getBorrowRequestsHistory();
		},
	});
	return { isLoading, data };
}
