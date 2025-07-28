import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = (props: any) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    // 'rgba(244,240,234, 1)'
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column", background: (theme) => theme.palette.background.default }}>
      {/* Header */}
      <Header onDrawerToggle={handleDrawerToggle} />
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      {/* 主体区域 */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          pt: (theme) => `${theme.customLayout.headerHeight}px`,
        }}
      >

        {/* 主内容 */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 1,
            pl: (theme) => `${theme.customLayout.sidebarWidth}px`,
          }}
        >
          <Container sx={{ height: "100vh" }} maxWidth={false}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
