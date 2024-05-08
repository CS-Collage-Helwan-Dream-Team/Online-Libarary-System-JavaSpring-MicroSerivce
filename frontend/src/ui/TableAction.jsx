import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import styled from "styled-components";

const StyleAction = styled.button`
    border: 2px solid var(--color-brand-700);
    display: flex;
    width: fit-content;
    padding: 0.5rem 0.4rem;
    border-radius: 1rem;
    font-size: 1.8rem;
    color: var(--color-brand-700);
`;
const TableAction = (props) => {
    return (
        <StyleAction {...props}>
            <BsThreeDotsVertical />
        </StyleAction>
    );
};

export default TableAction;
