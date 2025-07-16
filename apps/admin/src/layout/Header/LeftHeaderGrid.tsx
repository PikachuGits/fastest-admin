import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Fragment } from "react";
import { Iconify } from "@fastest/components";

const IconButtonBox = styled(IconButton)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2px",
    "&:hover": {
      scale: 1.05,
    },
  };
});
export const LeftHeaderGrid = () => {
  return (
    <Fragment>
      <IconButtonBox>
        <Iconify icon="solar:widget-broken" />
      </IconButtonBox>
    </Fragment>
  );
};
