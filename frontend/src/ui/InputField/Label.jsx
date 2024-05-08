import { forwardRef } from "react";
import { Root } from "@radix-ui/react-label";
import { cn } from "@/utils/cn";

const Label = forwardRef(({ className, ...props }, ref) => (
	<Root
		ref={ref}
		className={cn(
			"text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
			className
		)}
		{...props}
	/>
));
Label.displayName = Root.displayName;

export { Label };
