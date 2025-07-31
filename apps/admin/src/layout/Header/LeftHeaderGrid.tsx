import { Iconify } from "@fastest/components";
import { useMediaQuery, Box, Typography, useTheme } from "@mui/material";

import { StyledIconButton } from "./header.styles";
import { Fragment } from "react";
import RotatingBorderAvatar from "./AvatarWithRotatingBorder";


export const LeftHeaderGrid = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  return (
    <Fragment>
      <StyledIconButton>
        <Iconify icon="solar:widget-broken" />
      </StyledIconButton>
      <RotatingBorderAvatar src="/logo.png" />
      {
        !isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", marginLeft: '10px' }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              建业管理平台
            </Typography>
          </Box>
        )
      }
    </Fragment>
  );
};
