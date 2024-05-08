import BookCard from "@/ui/BookCard";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetFilterdBooks } from "./useGetFilterdBooks";
import Spinner from "@/ui/Spinner";
import withLoadingAndNoData from "@/ui/withLoadingAndNoData";
import BooksList from "./BooksList";
import { useGetCategories } from "./useGetCategories";

const AllBooksActions = () => {
    const [category, setCategory] = useState("all");
    const [searchParams, setSearchParams] = useSearchParams({});

    const handleCategoryChange = (newCategory) => {
        searchParams.set("category", newCategory);
        setSearchParams(searchParams);
    };

    // get the filtered books
    const { isLoading: isLoadingBooks, data } = useGetFilterdBooks();
    const books = data?.data;

    // get the categories
    const { categories } = useGetCategories();
    const categoriesData = categories?.data;

    useLayoutEffect(() => {
        setCategory(searchParams.get("category") || "all");
    }, [searchParams]);
    return (
        <section className="section-padding">
            <div className="container">
                <h2 className="text-center text-6xl font-[600] mb-12">
                    all books
                </h2>

                <div className="flex justify-center gap-8 text-[1.6rem] text-grey-500 font-[500] flex-wrap">
                    <button
                        className={`py-4 px-7 rounded-xl ${
                            category == "all"
                                ? "bg-brand-700 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                        onClick={() => handleCategoryChange("")}
                    >
                        all
                    </button>
                    {categoriesData?.map((button, index) => (
                        <button
                            key={index}
                            className={`py-4 px-7 rounded-xl ${
                                category == button.id
                                    ? "bg-brand-700 text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                            onClick={() => handleCategoryChange(button.id)}
                        >
                            {button.name}
                        </button>
                    ))}
                </div>

                <div className="mt-20">
                    <NewProductsWithLoadingAndNoData
                        data={books}
                        loading={isLoadingBooks}
                    />
                </div>
            </div>
        </section>
    );
};

const NewProductsWithLoadingAndNoData = withLoadingAndNoData(BooksList);

export default AllBooksActions;
