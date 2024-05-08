import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "@/services/AuthAPIs";

export function useSignUp(redirect = "/") {
	const navigate = useNavigate();

	const { mutate: signUp, isLoading } = useMutation({
		mutationFn: ({ username, email, password }) => {
			return registerUser(username, email, password);
		},
		onSuccess: (user) => {
			toast.success(user.message);
			navigate(redirect, { replace: true });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { signUp, isLoading };
}
