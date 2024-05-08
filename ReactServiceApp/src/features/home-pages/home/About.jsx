import React from "react";
import { FaAddressCard, FaBook, FaBookReader, FaMedal } from "react-icons/fa";
const items = [
    {
        icon: <FaAddressCard />,
        title: "member card",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
    },
    {
        icon: <FaMedal />,
        title: "high quality of book",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
    },
    {
        icon: <FaBookReader />,
        title: "free all books",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
    },
    {
        icon: <FaBook />,
        title: "up to date books",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
    },
];
const About = () => {
    return (
        <section className="section-padding">
            <div className="container">
                <div className="flex justify-center flex-col text-center">
                    <h2 className="text-7xl font-extrabold mb-6">
                        About <span className="text-brand-600">Us</span>
                    </h2>
                    <p className="max-w-[60rem] mx-auto text-[1.6rem] text-[var(--color-grey-400)]">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Vitae, asperiores. Officiis eos maxime ex?
                        Consequatur, esse inventore vitae doloribus architecto
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 mt-[8rem] items-center justify-center">
                    <div className="col-span-6 grid grid-cols-1  sm:grid-cols-2  gap-x-12 gap-y-20">
                        {items.map((item, index) => (
                            <div key={index}>
                                <span className="text-[3.5rem] text-brand-700 mb-10 relative flex items-center gap-4">
                                    {item.icon}
                                    <span className=" h-[2px] bg-brand-700 w-[100%] max-w-[12rem]"></span>
                                </span>
                                <h3 className="text-4xl font-semibold mb-4 text-[var(--color-grey-500)]">
                                    {item.title}
                                </h3>
                                <p className="text-[1.4rem] font-medium text-[var(--color-grey-300)]">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-4   rounded-[1rem] overflow-hidden">
                        <img src="/imgs/home_pages/about2.jpg" alt="about" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
