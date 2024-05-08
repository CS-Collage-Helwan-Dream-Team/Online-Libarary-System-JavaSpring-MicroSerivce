import { getBooks } from "@/services/userBookApis";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useGetLastFourBooks() {
    const [searchParams] = useSearchParams();

    // search
    const searchValue = searchParams.get("title");
    const search = !searchValue || searchValue === "" ? "" : searchValue;

    const { isLoading, data } = useQuery({
        queryKey: ["books", search],
        queryFn: () => {
            return getBooks(`title=${search}&orderBy=desc&limit=4`);
        },
    });
    return { isLoading, data };
}
