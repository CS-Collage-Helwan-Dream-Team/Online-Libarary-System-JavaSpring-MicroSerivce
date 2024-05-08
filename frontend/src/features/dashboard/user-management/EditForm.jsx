import Button from "@/ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Spinner from "@/ui/Spinner";
import { useUpdateMaxBorrowBooks } from "./useUpdateMaxBorrowBooks";

const StyleForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 3rem;
`;
const inputStyle = "px-[1rem] py-[.5rem] border-[2px] w-[100%]";
const EditForm = ({ data }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
	} = useForm({
		defaultValues: {
			maxBorrowedBooks: data?.maxBorrowedBooks || 0,
		},
	});

	const { isUpdating: isLoading, updateMaxBorrowBooks } =
		useUpdateMaxBorrowBooks(setError);

	const onSubmit = (formData) => {
		updateMaxBorrowBooks({
			id: data.id,
			maxBorrowedBooks: formData.maxBorrowedBooks,
		});
	};

	return (
		<div>
			{isLoading && <Spinner />}
			<StyleForm onSubmit={handleSubmit(onSubmit)}>
				<div className="">
					<label htmlFor="">Max borrow Books</label>
					<input
						className={`${inputStyle} mt-4`}
						placeholder="0"
						type="number"
						{...register("maxBorrowedBooks", {
							required: {
								value: true,
								message: "This field is required",
							},
						})}
					/>
					{errors.title && (
						<span className="text-red-500">
							{errors.maxBorrowedBooks.message || "This field is required"}
						</span>
					)}
				</div>

				<Button
					variation="secondary"
					type="submit"
					className="bg-primary text-white py-2 px-4 rounded-md"
				>
					submit
				</Button>
			</StyleForm>
		</div>
	);
};

export default EditForm;
