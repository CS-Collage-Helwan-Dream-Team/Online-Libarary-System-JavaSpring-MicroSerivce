import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useBorrowBook } from "@/features/home-pages/useBorrowBook";
import FullPageLoading from "./FullPageLoading";

const BookCard = ({ book }) => {
    const { isBorrowing, borrowBook } = useBorrowBook();

    return (
        <div className="mx-auto max-w-[35rem] basis-[30rem]">
            {isBorrowing && <FullPageLoading />}
            <div className="mb-8 rounded-2xl overflow-hidden relative">
                <img
                    src={book?.imageUrl || "/imgs/home_pages/book1.jpg"}
                    alt="book"
                    className="w-full"
                />
                <div className=" absolute inset-0 bg-[rgb(92,76,32,.9)] flex flex-col justify-center items-center gap-8 opacity-0 hover:opacity-100 transition-all">
                    <Link to={`/books/${book?.id}`}>
                        <Button variation="secondary">read more</Button>
                    </Link>
                    <Button
                        onClick={() => {
                            borrowBook(book?.id);
                        }}
                    >
                        borrow
                    </Button>
                </div>
            </div>
            <h3 className="text-4xl font-semibold mb-4 text-[var(--color-grey-500)] text-center">
                {book?.title}
            </h3>
        </div>
    );
};

export default BookCard;
