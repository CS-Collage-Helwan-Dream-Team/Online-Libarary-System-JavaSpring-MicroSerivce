import { apiCalling } from "@/utils/helpers";

export const getBorrowRequestsHistory = async () => {
    const response = await apiCalling(
        "borrow/user",
        "GET",
        {},
        {},
        false,
        "borrowService"
    );

    const data = await response.json();
    return data;
};
