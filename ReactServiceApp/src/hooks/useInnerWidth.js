import React from "react";

const useInnerWidth = () => {
    //get current width of page
    const [width, setWidth] = React.useState(window.innerWidth);
    //update width when page is resized
    React.useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return { width };
};

export default useInnerWidth;
