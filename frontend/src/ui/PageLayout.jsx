import React from "react";

const PageLayout = ({ children }) => {
    return (
        <div
            className="animated fade2"
            style={{ overflow: "hidden", minHeight: "100vh" }}
        >
            {children}
        </div>
    );
};

export default PageLayout;
