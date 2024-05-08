import { cn } from "@/utils/cn";
import { SparklesCore } from "./SparklesCore";

export default function SparkledTitle({
	TitleComponent = "h1",
	className,
	containerClassName,
	children,
}) {
	return (
		<div
			className={cn(
				"w-full flex flex-col items-center justify-center gap-3 overflow-hidden rounded-md",
				containerClassName
			)}
		>
			<TitleComponent className={cn("text-5xl capitalize", className)}>
				{children}
			</TitleComponent>

			<div className="w-[44rem] h-32 relative">
				{/* Gradients */}
				<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-brand-500 to-transparent h-[2px] w-3/4 blur-sm" />
				<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-brand-500 to-transparent h-px w-3/4" />
				<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-brand-200 to-transparent h-[5px] w-1/4 blur-sm" />
				<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-brand-200 to-transparent h-px w-1/4" />

				{/* Core component */}
				<SparklesCore
					background="transparent"
					minSize={0.8}
					maxSize={1.4}
					particleDensity={1000}
					className="w-full h-full"
					particleColor="#4c1c95"
				/>

				{/* Radial Gradient to prevent sharp edges */}
				<div className="absolute inset-0 w-full h-full bg-neutral-100 [mask-image:radial-gradient(250px_100px_at_top,transparent_20%,white)]" />
			</div>
		</div>
	);
}
