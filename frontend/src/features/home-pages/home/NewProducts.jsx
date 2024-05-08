import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../ui/Button";
import BookCard from "../../../ui/BookCard";
import { useGetLastFourBooks } from "./useGetLastFourBooks";
import withLoadingAndNoData from "@/ui/withLoadingAndNoData";

const NewProductsList = ({ data }) => {
    // Render the data
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-12 ">
            {data.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
};

const NewProductsWithLoadingAndNoData = withLoadingAndNoData(NewProductsList);

const NewProducts = () => {
    const { data, isLoading } = useGetLastFourBooks();
    const books = data?.data;
    return (
        <section className="section-padding">
            <div className="container">
                <div className="flex justify-center flex-col text-center">
                    <h2 className="text-7xl font-extrabold mb-6">
                        our <span className="text-brand-600">New</span> products
                    </h2>
                    <p className="max-w-[60rem] mx-auto text-[1.6rem] text-[var(--color-grey-400)]">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Vitae, asperiores. Officiis eos maxime ex?
                        Consequatur, esse inventore vitae doloribus architectoo
                    </p>
                </div>
                <div className="mt-[8rem]">
                    <NewProductsWithLoadingAndNoData
                        data={books}
                        loading={isLoading}
                    />
                </div>
            </div>
        </section>
    );
};

export default NewProducts;
