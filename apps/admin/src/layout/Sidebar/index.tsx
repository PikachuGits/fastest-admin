import React, { useLayoutEffect, useRef } from "react";
import {
  Box,

} from "@mui/material";
import { MenuList } from "@fastest/components";
import { useAppTheme } from "@/app/providers/ThemeProvider";
import menuDataRaw from './menu-data.json';
import type { NavData } from "@fastest/components";

// 类型断言确保 JSON 数据符合 NavData 接口
const menuData = menuDataRaw as NavData;

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const { theme, updateLayoutConfig } = useAppTheme();
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
    <Box
      ref={sidebarRef}
      component="nav"
      sx={{
        width: { md: 300 },
        height: (theme) => `calc(100vh - ${theme.customLayout.headerHeight}px)`,
        flexShrink: { md: 0 },
        px: 1,
        position: "fixed",
        top: (theme) => `${theme.customLayout.headerHeight}px`,
        overflowY: "auto",
        borderRight: '1px solid #e0e0e0',
      }}
    >
      <MenuList data={menuData} />
    </Box>
  );
};

export default Sidebar;
export { drawerWidth };
//  {/* 临时 drawer (手机端) */}
//  {isMobile && (
//   <Drawer
//     variant="temporary"
//     open={mobileOpen}
//     onClose={onDrawerToggle}
//     ModalProps={{ keepMounted: true }}
//     sx={{
//       display: { xs: "block", md: "none" },
//       "& .MuiDrawer-paper": {
//         boxSizing: "border-box",
//         width: drawerWidth,
//       },
//     }}
//   >
//     {drawer}
//   </Drawer>
// )}

// {/* 固定 drawer (桌面端) */}
// {!isMobile && (
//   <Drawer
//     variant="permanent"
//     open
//     sx={{
//       display: { xs: "none", md: "block" },
//       "& .MuiDrawer-paper": {
//         boxSizing: "border-box",
//         width: drawerWidth,
//       },
//     }}
//   >
//     {drawer}
//   </Drawer>
// )}
