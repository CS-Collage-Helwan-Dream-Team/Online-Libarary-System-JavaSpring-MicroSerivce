import AllBooksActions from "@/features/home-pages/all-books/AllBooksActions";
import MainHeroSection from "@/ui/MainHeroSection";
import PageLayout from "@/ui/PageLayout";
import React from "react";

const AllBooks = () => {
    return (
        <PageLayout>
            <MainHeroSection
                data={{
                    title: "the best online book store",
                    subtitle: "all books",
                    bgImage: "/imgs/home_pages/about2.jpg",
                }}
            />
            <AllBooksActions />
        </PageLayout>
    );
};

export default AllBooks;
