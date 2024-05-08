import {
	getTokenFromSession,
	removeTokenFromSession,
} from "./tokenSessionActions";

export const apiCalling = async (
	url,
	method,
	data,
	headers,
	noContentType = false
) => {
	const apiUrl = "http://localhost:5214/api/";
	const token = getTokenFromSession("token");

	const defaultHeaders = {
		...(noContentType ? {} : { "Content-Type": "application/json" }),
		Accept: "application/json",
		"Accept-Language": "en",
		Authorization: `Bearer ${token}`,
	};

	const defaultOptions = {
		method: method,
		headers: { ...defaultHeaders, ...headers },
	};

	if (method !== "GET") {
		defaultOptions.body = data;
	}

	const response = await fetch(`${apiUrl}${url}`, defaultOptions);

	return response;
};
