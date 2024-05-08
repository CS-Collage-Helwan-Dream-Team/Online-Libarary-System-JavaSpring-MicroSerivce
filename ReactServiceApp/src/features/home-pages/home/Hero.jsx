import React from "react";
import styled from "styled-components";
import Button from "../../../ui/Button";
import { Link } from "react-router-dom";
const HeroStyle = styled.header`
    background: radial-gradient(rgb(92 76 32 / 75%), rgb(0 0 0 / 90%)),
        url(/imgs/home_pages/hero2.jpg) no-repeat;
    background-size: cover;
`;
const Hero = () => {
    return (
        <HeroStyle className=" pt-[25rem] pb-[15rem] text-center">
            <div className="container ">
                <div className="text-[#fff]">
                    <h2 className="text-brand-700 text-5xl font-bold mb-4">
                        books_
                    </h2>
                    <h1 className="font-bold text-9xl">
                        the best <span className="text-brand-700 ">online</span>
                        <br />
                        book <span className="text-brand-700">store</span>
                    </h1>
                    <p className="max-w-[60rem] mt-8 text-[1.6rem] font-normal mx-auto ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ex, consectetur dolor, quaerat consequuntur voluptatum
                    </p>
                    <Link className="mt-12" to="/books">
                        <Button variation="secondary">shop now</Button>
                    </Link>
                </div>
            </div>
        </HeroStyle>
    );
};

export default Hero;
