import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { loginUser } from "@/services/AuthAPIs";

export function useLogin(redirect = "/") {
    const { setUser, setToken } = useAuthContext();
    const navigate = useNavigate();

    const { mutate: login, isPending: isLoading } = useMutation({
        mutationFn: ({ email, password }) => {
            return loginUser(email, password);
        },
        onSuccess: (user) => {
            toast.success(user.message);
            setToken(user.data.token);
            setUser(user.data.user_account);
            navigate(redirect, { replace: true });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { login, isLoading };
}
