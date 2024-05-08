import { cn } from "@/utils/cn";

export default function Container({ children, className = "" }) {
	return (
		<div className={cn("max-w-screen-xl mx-auto mt-10 px-10", className)}>
			{children}
		</div>
	);
}
