import { forwardRef } from "react";
import { LabelInputContainer } from "./LabelInputContainer";
import { Label } from "./Label";
import { Input } from "./Input";

const InputField = forwardRef(
	(
		{
			id,
			label,
			placeholder,
			type,
			className,
			labelClass = "",
			inputClass = "",
			labelProps,
			error,
			...inputProps
		},
		ref
	) => {
		return (
			<LabelInputContainer className={className}>
				<Label htmlFor={id} className={labelClass} {...labelProps}>
					{label}
				</Label>
				<Input
					id={id}
					className={inputClass}
					placeholder={placeholder}
					type={type}
					ref={ref}
					{...inputProps}
				/>
				{
					<p
						className={`h-2 text-red-600 text-lg text-nowrap ${
							error ? "opacity-100" : "opacity-0"
						} origin-left transition-opacity duration-500`}
					>
						{error?.message}
					</p>
				}
			</LabelInputContainer>
		);
	}
);

InputField.displayName = "InputField";

export default InputField;
