import React from "react";
import Hero from "../features/home-pages/home/Hero";
import About from "../features/home-pages/home/About";
import NewProducts from "../features/home-pages/home/NewProducts";
import PageLayout from "@/ui/PageLayout";

const Home = () => {
    return (
        <PageLayout>
            <Hero />
            <About />
            <NewProducts />
        </PageLayout>
    );
};

export default Home;
