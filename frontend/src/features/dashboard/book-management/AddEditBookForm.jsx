import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useCreateBook } from "./useCreateBook";
import { Description } from "@radix-ui/react-dialog";
import { useUpdateBook } from "./useUpdateBook";
import Spinner from "@/ui/Spinner";
import FullPageLoading from "@/ui/FullPageLoading";
import { useGetCategories } from "@/features/home-pages/all-books/useGetCategories";
import { useGetLibirarianCategory } from "./useGetLibirarianCategory";

const StyleForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;
const inputStyle = "px-[1rem] py-[.5rem] border-[2px] w-[100%]";
const AddEditBookForm = ({ data, setDialogOpen }) => {
    const isEdit = Boolean(data?.id);
    const {
        register,
        setValue,
        control,
        formState: { errors },
        handleSubmit,
        setError,
        reset,
    } = useForm({
        defaultValues: {
            title: data?.title || "",
            Description: data?.description || "",
            author: data?.authorName || "",
            ISBN: data?.isbn || "",
            rackNumber: data?.rackNumber || "",
        },
    });
    const { isCreating, createBook } = useCreateBook(setError);
    const { isUpdating, updateBook } = useUpdateBook(setError);
    const { data: categories, isLoading: isCategoriesLoading } =
        useGetLibirarianCategory();
    const isLoading = isCreating || isUpdating;
    const categoriesData = categories?.data || [];
    const onSubmit = (formData) => {
        console.log(formData);
        if (isEdit) {
            updateBook({ ...formData, id: data.id });
        } else {
            createBook(formData, {
                onSuccess: () => {
                    reset();
                    setDialogOpen(false);
                },
            });
        }
    };
    return (
        <div>
            {isLoading && <FullPageLoading />}
            <StyleForm onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <label htmlFor="">book name</label>
                    <input
                        className={`${inputStyle} mt-4`}
                        type="text"
                        placeholder="Book Name"
                        {...register("title", { required: true })}
                    />
                    {errors.title && (
                        <span className="text-red-500">
                            {errors.author.message || "This field is required"}
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="">author name</label>
                    <input
                        className={`${inputStyle} mt-4`}
                        type="text"
                        placeholder="author  Name"
                        {...register("author", { required: true })}
                    />
                    {errors.author && (
                        <span className="text-red-500">
                            {errors.author.message || "This field is required"}
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="">ISBN</label>
                    <input
                        className={`${inputStyle} mt-4`}
                        type="text"
                        placeholder="ISBN "
                        {...register("ISBN", { required: true })}
                    />
                    {errors.ISBN && (
                        <span className="text-red-500">
                            {errors.ISBN.message || "This field is required"}
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="">rackNumber</label>
                    <input
                        className={`${inputStyle} mt-4`}
                        type="number"
                        placeholder="rackNumber"
                        {...register("rackNumber", { required: true })}
                    />
                    {errors.rackNumber && (
                        <span className="text-red-500">
                            {errors.rackNumber.message ||
                                "This field is required"}
                        </span>
                    )}
                </div>
                {!isCategoriesLoading && (
                    <div>
                        <label htmlFor="">category</label>
                        <select
                            className={`${inputStyle} mt-4`}
                            {...register("categoryId", { required: true })}
                        >
                            <option value="">select book category</option>

                            {categoriesData.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <label htmlFor="">description</label>
                    <textarea
                        className={`${inputStyle}`}
                        {...register("Description", { required: true })}
                        id=""
                    ></textarea>
                    {errors.Description && (
                        <span className="text-red-500">
                            {errors.Description.message ||
                                "This field is required"}
                        </span>
                    )}
                </div>
                <div>
                    <FileInput
                        control={control}
                        defaultValue={data?.imageUrl}
                        reg={{
                            ...register("image", {
                                required: "This field is required",
                            }),
                        }}
                        setFormValue={(name, value) => {
                            setValue(name, value);
                        }}
                    />
                    <span>
                        {errors.image && (
                            <span className="text-red-500">
                                {errors.image.message ||
                                    "This field is required"}
                            </span>
                        )}
                    </span>
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

export default AddEditBookForm;
