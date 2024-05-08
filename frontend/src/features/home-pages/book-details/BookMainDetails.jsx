import BookCard from "@/ui/BookCard";
import Button from "@/ui/Button";
import React from "react";
import { useBorrowBook } from "../useBorrowBook";

const BookMainDetails = ({ book, relatedBooks }) => {
    const { isBorrowing, borrowBook } = useBorrowBook();

    return (
        <section className="my-5 mb-[10rem]">
            <div className="flex gap-12 flex-wrap section-padding justify-center items-center">
                <div className=" basis-[50rem]  max-w-[50rem] ">
                    <img
                        src={book?.imageUrl || "/imgs/home_pages/book1.jpg"}
                        alt="book"
                    />
                </div>
                <div className="basis-[55rem] ">
                    <div className=" pb-6 mb-6 border-b-2 border-b-gray-200 ">
                        <h2 className="mb-6 font-[600] text-6xl">
                            {book?.title}
                        </h2>
                        <div className="text-[2rem] font-[300] text-grey-400">
                            by:{" "}
                            <span className="text-brand-700 font-[600]">
                                {book?.authorName}
                            </span>
                        </div>
                    </div>
                    <p className="text-grey-400 mb-8 line-clamp-5">
                        {book?.description}
                    </p>

                    <div className="text-2xl text-grey-400 font-[300] mb-8">
                        availability:{" "}
                        {book.isAvailable ? (
                            <span className="text-green-500 font-[600]">
                                available
                            </span>
                        ) : (
                            <span className="text-red-500 font-[600]">
                                not available
                            </span>
                        )}
                    </div>
                    <div className="text-2xl text-grey-400 font-[300] mb-8">
                        category:{" "}
                        <span className="text-grey-500 font-[600]">
                            {book?.category?.name}
                        </span>
                    </div>
                    <Button
                        onClick={() => {
                            borrowBook(book?.id);
                        }}
                        variation="secondary"
                    >
                        borrow
                    </Button>
                </div>
            </div>
            <div className="mt-[5rem] max-w-[120rem] text-[1.6rem] leading-[1.7] px-10 mx-[auto]">
                <p>{book?.description}</p>
            </div>
            {relatedBooks?.length > 0 && (
                <>
                    <h2 className="text-7xl font-extrabold mt-24  text-center">
                        related <span className="text-brand-600">books</span>
                    </h2>
                    <div className="flex gap-12 mt-[3rem] flex-wrap justify-center mb-[6rem]">
                        {relatedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default BookMainDetails;
