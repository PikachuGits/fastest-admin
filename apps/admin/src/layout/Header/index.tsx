import React, { useLayoutEffect, useRef } from "react";
import {
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { Iconify } from "@fastest/components";

import "@/layout/styles/header.less";
import { RightHeaderGrid } from "./RightHeaderGrid";
import { LeftHeaderGrid } from "./LeftHeaderGrid";
import { useAppLayout } from "@fastest/hook";
import {
  StyledAppBar,
  StyledToolbar,
  StyledIconButton,
  StyledMainBox
} from "./header.styles";

interface HeaderProps {
  onDrawerToggle: () => void;
}



/**
 * 右 logo 操作图标 search
 * 左
 * @param param0
 * @returns
 */
const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
  const { updateLayoutConfig } = useAppLayout();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (headerRef.current) {
      updateLayoutConfig({ headerHeight: headerRef.current.offsetHeight });
    }
  }, [headerRef?.current]);

  return (
    <StyledAppBar
      ref={headerRef}
      elevation={0}
      className="header-bar-custom"
      position="fixed"
      color="transparent"
    >
      <StyledToolbar disableGutters={true}>
        {isMobile && (
          <StyledIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
          >
            <Iconify icon="custom:menu-duotone" />
          </StyledIconButton>
        )}

        <StyledMainBox>
          <Grid container spacing={2}>
            <Grid size={isMobile ? 2 : 4} className="flex justify-start items-center">
              <LeftHeaderGrid />
            </Grid>
            <Grid size={isMobile ? 10 : 8} className="flex justify-end">
              <RightHeaderGrid />
            </Grid>
          </Grid>
        </StyledMainBox>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
