import React, { useLayoutEffect, useRef, useState } from "react";
import { MenuList } from "@fastest/components";
import { useAppTheme } from "@/app/providers/ThemeProvider";
import menuDataRaw from './menu-data.json';
import type { NavData } from "@fastest/components";
import {
  StyledArrowIcon,
  StyledSidebarContainer,
  StyledToggleButton,
  StyledSidebarNav
} from "./sidebar.styles";

// 类型断言确保 JSON 数据符合 NavData 接口
const menuData = menuDataRaw as NavData;

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const [open, setOpen] = useState(false);
  const { updateLayoutConfig } = useAppTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (sidebarRef.current) {
      updateLayoutConfig({ sidebarWidth: sidebarRef.current.offsetWidth });
    }
  }, [sidebarRef, sidebarRef.current?.offsetWidth]);
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // const drawer = (
  //   <Box sx={{ p: 2 }}>
  //     <Typography variant="h6">Sidebar</Typography>
  //     <Divider sx={{ my: 2 }} />
  //     {/* Sidebar Links */}
  //     <Box>导航链接1</Box>
  //     <Box>导航链接2</Box>
  //   </Box>
  // );

  return (
    <StyledSidebarContainer>
      <StyledToggleButton onClick={() => setOpen(!open)}>
        <StyledArrowIcon
          icon="eva:arrow-ios-downward-fill"
          open={open}
          className="icon-arrow"
        />
      </StyledToggleButton>

      <StyledSidebarNav
        ref={sidebarRef}
      >
        <MenuList data={menuData} />
      </StyledSidebarNav>
    </StyledSidebarContainer>
  );
};

export default Sidebar;
export { drawerWidth };
