import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
	const { setUser, setToken } = useAuthContext();
	const navigate = useNavigate();

	const logout = () => {
		setToken("");
		setUser("");
		navigate("/login");
	};

	return { logout };
};
