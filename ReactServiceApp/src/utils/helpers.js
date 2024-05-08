import { getUserFromSession } from "./userSessionActions";

const API_PORTS = {
	users: 9093,
	bookService: 9092,
	borrowService: 9094,
};

export const apiCalling = async (
	url,
	method,
	data,
	headers,
	noContentType = false,
	requestType = "users"
) => {
	const apiUrl = `http://localhost:${API_PORTS[requestType]}/api/`;
	const user = getUserFromSession();

	const defaultHeaders = {
		...(noContentType ? {} : { "Content-Type": "application/json" }),
		Accept: "application/json",
		"Accept-Language": "en",
		credentials: user?.id,
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
