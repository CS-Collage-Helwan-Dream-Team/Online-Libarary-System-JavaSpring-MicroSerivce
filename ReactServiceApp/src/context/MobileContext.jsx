import React, { createContext, useContext, useState, useEffect } from "react";

const MobileContext = createContext();
const MobileProvider = ({ children }) => {
    const [mobileState, setMobileState] = useState("");
    const [width, setWindowWidth] = useState(0);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const updateDimensions = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
        if (width < 992) setMobileState("mobile");
        else setMobileState("");
    };

    return (
        <MobileContext.Provider
            value={{
                mobileState,
                setMobileState,
                setOpen,
                open,
            }}
        >
            {children}
        </MobileContext.Provider>
    );
};

function useMobileContext() {
    const context = useContext(MobileContext);
    if (context === undefined)
        throw new Error(
            "language context was used outside of language provider"
        );
    return context;
}
export { MobileProvider, useMobileContext };
