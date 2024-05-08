import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
	const { token } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (token) navigate("/not-found", { replace: true });
	}, [token, navigate]);

	return (
		<>
			<Outlet />
		</>
	);
}
