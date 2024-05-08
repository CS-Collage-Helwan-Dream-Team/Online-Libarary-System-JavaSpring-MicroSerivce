import React from "react";
import styled from "styled-components";
const FooterStyle = styled.footer`
    background: var(--color-brand-600);
`;

const CopyRight = styled.div`
    font-size: 1.4rem;
    text-align: center;
    padding: 2rem 0;
    color: var(--color-grey-0);
    font-size: 1.8rem;
`;
const Footer = () => {
    return (
        <FooterStyle>
            <CopyRight className="container">
                <p>Copyright Books. All Rights Reserved</p>
            </CopyRight>
        </FooterStyle>
    );
};

export default Footer;
