import BookMainDetails from "@/features/home-pages/book-details/BookMainDetails";
import { useGetBookDetails } from "@/features/home-pages/book-details/useGetBookDetails";
import MainHeroSection from "@/ui/MainHeroSection";
import PageLayout from "@/ui/PageLayout";
import Spinner from "@/ui/Spinner";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetBookDetails(id);
    const book = data?.data?.book;
    const navigate = useNavigate();
    if (isLoading) {
        return (
            <div className="h-[100vh] flex items-center">
                <Spinner />
            </div>
        );
    }
    if (!book || !book?.id) {
        navigate("/404", { replace: true });
    }
    return (
        <PageLayout key={book?.id} className="">
            <MainHeroSection
                data={{
                    title: book?.title,
                    subtitle: "book details",
                    bgImage: "/imgs/home_pages/hero.jpg",
                }}
            />

            <div className="container  ">
                <BookMainDetails
                    book={book}
                    relatedBooks={data?.data?.relatedBooks}
                />
            </div>
        </PageLayout>
    );
};

export default BookDetails;
