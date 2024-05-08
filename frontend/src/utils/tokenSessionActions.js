export const setTokenToSession = (token) => {
	sessionStorage.setItem("token", token);
};

export const getTokenFromSession = () => {
	return sessionStorage.getItem("token");
};

export const removeTokenFromSession = () => {
	sessionStorage.removeItem("token");
};
