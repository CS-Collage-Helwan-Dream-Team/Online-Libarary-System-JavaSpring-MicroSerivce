import { apiCalling } from "@/utils/helpers";

export const getUsers = async (query) => {
	const response = await apiCalling(`librarian/users?${query}`, "GET", {}, {});

	const data = await response.json();
	return data;
};

export const acceptUser = async (id) => {
	const response = await apiCalling(
		`librarian/users/${id}/approve`,
		"PATCH",
		{},
		{}
	);

	const data = await response.json();
	return data;
};

export const rejectUser = async (id) => {
	const response = await apiCalling(
		`librarian/users/${id}/reject`,
		"PATCH",
		{},
		{}
	);

	const data = await response.json();
	return data;
};

export const deleteUser = async (id) => {
	const response = await apiCalling(`librarian/users/${id}`, "DELETE", {}, {});

	const data = await response.json();
	return data;
};

export const updateUserMaxBorrowBooks = async (id, maxBorrowedBooks) => {
	const response = await apiCalling(
		`borrow/${id}/updateMaxBorrow`,
		"PATCH",
		JSON.stringify({ maxBorrow: maxBorrowedBooks }),
		{}
	);

	const data = await response.json();
	return data;
};
