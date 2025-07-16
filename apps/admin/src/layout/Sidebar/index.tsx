import React from "react";
import {
  Box,
  Divider,
  Drawer,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { MenuList } from "@fastest/components";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Sidebar</Typography>
      <Divider sx={{ my: 2 }} />
      {/* Sidebar Links */}
      <Box>导航链接1</Box>
      <Box>导航链接2</Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <MenuList />
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
