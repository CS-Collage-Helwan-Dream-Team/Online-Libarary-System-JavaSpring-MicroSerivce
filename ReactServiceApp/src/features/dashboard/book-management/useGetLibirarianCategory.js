import { getCategories } from "@/services/libirarianBookApi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useGetLibirarianCategory() {
    const { isPending: isLoading, data } = useQuery({
        queryKey: ["categories"],
        queryFn: () => {
            return getCategories();
        },
    });
    return { isLoading, data };
}
