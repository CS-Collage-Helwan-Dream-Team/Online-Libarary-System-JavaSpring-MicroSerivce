import { apiCalling } from "@/utils/helpers";

export const getBorrowRequests = async (query) => {
	const response = await apiCalling(`borrow?${query}`, "GET", {}, {});

	const data = await response.json();
	return data;
};

export const acceptBorrowRequest = async (id) => {
	const response = await apiCalling(`borrow/${id}/approve`, "PATCH", {}, {});

	const data = await response.json();
	return data;
};

export const rejectBorrowRequest = async (id) => {
	const response = await apiCalling(`borrow/${id}/reject`, "PATCH", {}, {});

	const data = await response.json();
	return data;
};
