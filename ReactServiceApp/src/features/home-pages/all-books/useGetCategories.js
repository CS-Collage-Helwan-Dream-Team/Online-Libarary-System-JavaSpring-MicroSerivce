import { getCategories } from "@/services/userBookApis";
import { useQuery } from "@tanstack/react-query";

export function useGetCategories() {
    const { isPending: isLoading, data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => {
            return getCategories();
        },
    });
    return { isLoading, categories };
}
