import React from "react";
import { StyledFooterContainer, StyledFooterText } from "./footer.styles";

const Footer: React.FC = () => {
    return (
        <StyledFooterContainer>
            <StyledFooterText variant="body2">
                © 2025 Powered by MUI
            </StyledFooterText>
        </StyledFooterContainer>
    );
};

export default Footer