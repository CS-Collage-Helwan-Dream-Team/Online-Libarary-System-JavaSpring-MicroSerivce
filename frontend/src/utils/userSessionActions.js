export const setUserToSession = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
}

export const getUserFromSession = () => {
  return JSON.parse(sessionStorage.getItem("user"));
}

export const removeUserFromSession = () => {
  sessionStorage.removeItem("user");
}