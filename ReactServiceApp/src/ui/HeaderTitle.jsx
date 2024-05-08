import { cn } from "@/utils/cn";
import SparkledTitle from "./SparkledTitle";

export default function HeaderTitle({
	TitleComponent,
	containerClassName,
	titleContainerClassName,
	className,
	separatorClassName,
	children,
}) {
	return (
		<div>
			<div className={cn("px-2 pt-60 bg-neutral-100", containerClassName)}>
				<SparkledTitle
					TitleComponent={TitleComponent}
					className={className}
					containerClassName={titleContainerClassName}
				>
					{children}
				</SparkledTitle>
			</div>
			<div
				className={cn(
					"h-20 bg-gradient-to-b from-neutral-100 to-transparent",
					separatorClassName
				)}
			/>
		</div>
	);
}
