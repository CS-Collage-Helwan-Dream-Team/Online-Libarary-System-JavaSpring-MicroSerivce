import Button from "@/ui/Button";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="h-[100vh] flex items-center justify-center flex-col">
            <img className="w-[30%] min-w-[40rem]" src="/imgs/404.svg" />

            <Link to="/" className="text-brand-700 text-2xl mt-12">
                <Button variation="secondary">Go back to home</Button>
            </Link>
        </div>
    );
};

export default NotFound;
