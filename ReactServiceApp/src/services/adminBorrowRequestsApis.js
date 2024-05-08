import { apiCalling } from "@/utils/helpers";

export const getBorrowRequests = async (query) => {
    const response = await apiCalling(
        `borrow?${query}`,
        "GET",
        {},
        {},
        false,
        "borrowService"
    );

    const data = await response.json();
    return data;
};

export const acceptBorrowRequest = async (id) => {
    const response = await apiCalling(
        `borrow/${id}/approve`,
        "PATCH",
        {},
        {},
        false,
        "borrowService"
    );

    const data = await response.json();
    return data;
};

export const rejectBorrowRequest = async (id) => {
    const response = await apiCalling(
        `borrow/${id}/reject`,
        "PATCH",
        {},
        {},
        false,
        "borrowService"
    );

    const data = await response.json();
    return data;
};
