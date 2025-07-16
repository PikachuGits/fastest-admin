import React, { useLayoutEffect, useRef } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  useMediaQuery,
  Box,
  Grid,
  styled,
} from "@mui/material";
import { Iconify } from "@fastest/components";

import "@/layout/styles/header.less";
import { RightHeaderGrid } from "./RightHeaderGrid";
import { LeftHeaderGrid } from "./LeftHeaderGrid";
import { useAppTheme } from "@/app/providers/ThemeProvider";

interface HeaderProps {
  onDrawerToggle: () => void;
}

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

/**
 * 右 logo 操作图标 search
 * 左
 * @param param0
 * @returns
 */
const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
  const { theme, setHeaderHeight } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef, headerRef.current?.offsetHeight]);

  return (
    <AppBar
      ref={headerRef}
      elevation={0}
      className="header-bar-custom"
      position="fixed"
      color="transparent"
      sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
    >
      <Toolbar disableGutters={false}>
        {isMobile && (
          <IconButtonBox
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
          >
            <Iconify icon="custom:menu-duotone" />
          </IconButtonBox>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={isMobile ? 2 : 4}>
              <LeftHeaderGrid />
            </Grid>

            <Grid size={isMobile ? 10 : 8} className="flex justify-end">
              <RightHeaderGrid />
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
