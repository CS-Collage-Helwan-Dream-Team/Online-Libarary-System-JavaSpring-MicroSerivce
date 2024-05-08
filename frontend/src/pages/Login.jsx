import Container from "@/features/auth-pages/Container";
import Heading from "@/features/auth-pages/Heading";
import { useLogin } from "@/features/auth-pages/useLogin";
import Button from "@/ui/Button";
import FullPageLoading from "@/ui/FullPageLoading";
import InputField from "@/ui/InputField";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";
    const { login, isLoading } = useLogin(redirect);

    const handleNavigateToSignUp = () => {
        navigate(`/signup?redirect=${redirect}`);
    };

    const onSubmit = (data) => {
        login({ email: data.email, password: data.password });
    };

    return (
        <Container isLogin>
            <Heading
                titlePrefix="Welcome to"
                title="The Best Online Book Store"
                subtitle="Login to the books library system"
            />
            {isLoading && <FullPageLoading />}
            <form
                className="flex flex-col items-center gap-8 my-8 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputField
                    id="email"
                    placeholder="example@example.com"
                    type="text"
                    label="Email"
                    inputClass="h-20 text-xl"
                    labelClass="text-xl"
                    error={errors.email}
                    {...register("email", {
                        required: {
                            value: true,
                            message:
                                "Email is required, you must enter an email address.",
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address.",
                        },
                    })}
                />

                <InputField
                    id="password"
                    placeholder="••••••••••••••"
                    label="Password"
                    type="password"
                    inputClass="h-20 text-xl"
                    labelClass="text-xl"
                    error={errors.password}
                    {...register("password", {
                        required: {
                            value: true,
                            message:
                                "Password is required, you must enter a password.",
                        },
                        minLength: {
                            value: 8,
                            message:
                                "Password must be at least 8 characters long.",
                        },
                    })}
                />

                <div className="flex justify-between gap-24 w-full">
                    <Button
                        type="submit"
                        className="w-full mt-5 hover:!text-white"
                    >
                        Login In
                    </Button>
                    <Button
                        type="button"
                        variation="secondary"
                        className="w-full mt-5 hover:!text-white"
                        onClick={handleNavigateToSignUp}
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
        </Container>
    );
}
