import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignUp } from "@/features/auth-pages/useSignUp";
import Container from "@/features/auth-pages/Container";
import Heading from "@/features/auth-pages/Heading";
import InputField from "@/ui/InputField";
import Button from "@/ui/Button";

export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirect = searchParams.get("redirect") || "/";
	const loginUrl = `/login?redirect=${redirect}`;
	const { signUp } = useSignUp(loginUrl);

	const handleNavigateToLogin = () => {
		navigate(loginUrl);
	};

	const onSubmit = (data) => {
		signUp({
			username: data.username,
			email: data.email,
			password: data.password,
		});
	};

	return (
		<Container isLogin>
			<Heading
				titlePrefix="Welcome to"
				title="The Best Online Book Store"
				subtitle="Create account and join us in the books library system"
			/>

			<form
				className="flex flex-col items-center gap-8 mt-10 mb-4 w-full"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="w-full flex justify-between gap-16">
					<InputField
						id="email"
						placeholder="example@example.com"
						type="text"
						label="Email"
						inputClass={`h-20 text-xl ${
							errors.email ? "border-brand-500" : ""
						}`}
						labelClass="text-xl"
						{...register("email", {
							required: {
								value: true,
								message: "Email is required, you must enter an email address.",
							},
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: "Invalid email address.",
							},
						})}
					/>
					<InputField
						id="username"
						placeholder="example@example.com"
						type="text"
						label="Username"
						inputClass={`h-20 text-xl ${
							errors.username ? "border-brand-500" : ""
						}`}
						labelClass="text-xl"
						{...register("username", {
							required: {
								value: true,
								message: "Username is required, you must enter an username.",
							},
						})}
					/>
				</div>

				<InputField
					id="password"
					placeholder="••••••••••••••"
					label="Password"
					type="password"
					inputClass={`h-20 text-xl ${
						errors.password ? "border-brand-500" : ""
					}`}
					labelClass="text-xl"
					{...register("password", {
						required: {
							value: true,
							message: "Password is required, you must enter a password.",
						},
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters long.",
						},
					})}
				/>

				<InputField
					id="confirmPassword"
					placeholder="••••••••••••••"
					label="confirm password"
					type="password"
					inputClass={`h-20 text-xl ${
						errors.confirmPassword ? "border-brand-500" : ""
					}`}
					labelClass="text-xl"
					{...register("confirmPassword", {
						required: {
							value: true,
							message:
								"Password confirmation is required, you must confirm your password.",
						},
						deps: "password",
						validate: (value, fieldsValues) => value === fieldsValues.password,
					})}
				/>

				<div className="flex justify-between gap-24 w-full">
					<Button type="submit" className="w-full mt-5 hover:!text-white">
						Sign Up
					</Button>
					<Button
						type="button"
						variation="secondary"
						className="w-full mt-5 hover:!text-white"
						onClick={handleNavigateToLogin}
					>
						Login In
					</Button>
				</div>
			</form>
		</Container>
	);
}
