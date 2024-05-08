import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBorrowRequests } from "@/services/adminBorrowRequestsApis";

export function useGetFilteredBorrowRequests() {
	// search
	const [searchParams] = useSearchParams();
	const search = searchParams.get("q") || "";

	const {
		isPending: isLoading,
		data,
		refetch,
	} = useQuery({
		queryKey: ["borrowRequests", search],
		queryFn: () => {
			return getBorrowRequests(`bookName=${search}`);
		},
	});
	return { isLoading, data, refetch };
}
