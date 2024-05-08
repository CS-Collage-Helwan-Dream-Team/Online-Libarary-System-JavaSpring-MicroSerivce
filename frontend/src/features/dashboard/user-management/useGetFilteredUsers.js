import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "@/services/adminUsersManagementApis";

export function useGetFilteredUsers() {
	// search
	const [searchParams] = useSearchParams();
	const search = searchParams.get("q") || "";

	const { isLoading, data, refetch } = useQuery({
		queryKey: ["users", search],
		queryFn: () => {
			return getUsers(`user=${search}`);
		},
	});
	return { isLoading, data, refetch };
}
