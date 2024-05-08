import styled, { css } from "styled-components";

const sizes = {
    small: css`
        font-size: 1.2rem;
        padding: 0.4rem 0.8rem;
        text-transform: uppercase;
        font-weight: 600;
        text-align: center;
    `,
    medium: css`
        font-size: 1.4rem;
        padding: 0.8rem 1.2rem;
        font-weight: 500;
    `,
    large: css`
        font-size: 1.6rem;
        padding: 1rem 1.5rem;
        font-weight: 500;
    `,
};

const variations = {
    primary: css`
        color: var(--color-grey-0);
        background-color: var(--color-brand-600);
        &:hover {
            background: var(--color-brand-700);
        }
    `,
    secondary: css`
        color: var(--color-brand-600);
        background: transparent;
        border-color: var(--color-brand-600);
        &:hover {
            background: var(--color-brand-200);
            color: var(--color-grey-700);
        }
    `,
    third: css`
        color: var(--color-grey-0);
        background: var(--color-grey-500);

        &:hover {
            color: var(--color-grey-0) !important;
        }
    `,
    danger: css`
        color: var(--color-grey-0);
        background-color: var(--color-red-700);

        &:hover {
            color: var(--color-grey-0) !important;
        }
    `,
};

const Button = styled.button`
    border: 2px solid transparent;
    ${(props) => sizes[props.size]}
    ${(props) => variations[props.variation]}
    border-radius: .5rem;
    position: relative;
    z-index: 2;
    overflow: hidden;
    transition: 0.3s all ease;
    min-width: 15rem;
`;
Button.defaultProps = {
    size: "large",
    variation: "primary",
};
export default Button;
