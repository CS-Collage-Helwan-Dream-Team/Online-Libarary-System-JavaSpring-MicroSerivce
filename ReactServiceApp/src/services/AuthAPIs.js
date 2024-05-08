import { apiCalling } from "@/utils/helpers";

export const loginUser = async (email, password) => {
	try {
		const response = await apiCalling(
			"Auth/login",
			"POST",
			JSON.stringify({
				email,
				password,
			}),
			{},
			false,
			"users"
		);
		if (!response.ok) {
			const errorData = await response.json();

			throw new Error(errorData.message);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const registerUser = async (username, email, password) => {
	const response = await apiCalling(
		"Auth/customer/register",
		"POST",
		JSON.stringify({
			email,
			password,
			username,
		}),
		{},
		false,
		"users"
	);

	const data = await response.json();
	return data;
};
