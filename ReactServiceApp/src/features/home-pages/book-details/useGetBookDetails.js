import { getBook } from "@/services/userBookApis";
import { useQuery } from "@tanstack/react-query";

export function useGetBookDetails(id) {
    const { isLoading, data } = useQuery({
        queryKey: ["book", id],
        queryFn: () => {
            return getBook(id);
        },

        refetchOnReconnect: false,
        retry: 0,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });
    return { isLoading, data };
}
