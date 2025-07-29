import { Fragment } from "react";
import { Iconify } from "@fastest/components";
import { StyledIconButton } from "./header.styles";
export const LeftHeaderGrid = () => {
  return (
    <Fragment>
      <StyledIconButton>
        <Iconify icon="solar:widget-broken" />
      </StyledIconButton>
    </Fragment>
  );
};
