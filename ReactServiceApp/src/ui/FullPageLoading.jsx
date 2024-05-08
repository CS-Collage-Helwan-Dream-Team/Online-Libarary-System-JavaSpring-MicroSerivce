import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";
import { createPortal } from "react-dom";

const StyleLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100%;
    position: fixed;
    inset: 0;
    background-color: color-mix(
        in srgb,
        var(--color-grey-700) 70%,
        transparent
    );
    z-index: 99999;
`;
const FullPageLoading = () => {
    return createPortal(
        <StyleLoading>
            <Spinner />
        </StyleLoading>,
        document.getElementById("myPortal")
    );
};

export default FullPageLoading;
