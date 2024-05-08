import { getBooks } from "@/services/userBookApis";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useGetFilterdBooks() {
    // search
    const [searchParams] = useSearchParams();
    const search = searchParams.get("q") || "";

    // category
    const category = searchParams.get("category") || "";

    const { isLoading, data } = useQuery({
        queryKey: ["books", search, category],
        queryFn: () => {
            return getBooks(
                `title=${search}&${category ? `category=${category}` : ""}`
            );
        },
    });
    return { isLoading, data };
}
