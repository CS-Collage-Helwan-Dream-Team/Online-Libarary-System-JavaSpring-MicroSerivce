import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBooks } from "@/services/libirarianBookApi";

export function useGetlibirarianBooks() {
    // by isbn
    const [searchParams] = useSearchParams();
    const search = searchParams.get("isbn") || "";
    // by rack number
    const rackNumber = searchParams.get("rackNumber") || "";

    const { isPending: isLoading, data } = useQuery({
        queryKey: ["books", search, rackNumber],
        queryFn: () => {
            return getBooks(
                `isbn=${search}&${rackNumber ? `rackNumber=${rackNumber}` : ""}`
            );
        },
    });
    return { isLoading, data };
}
