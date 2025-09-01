import React, { useState, useCallback, useEffect } from "react";
import { MenuDemo, Iconify } from "@fastest/components";
import { Box, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppStore } from "@/store";

// ==================== 测试数据 Test Data ====================
// 侧边栏切换按钮
export const StyledToggleButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  border: `1px solid ${theme.customLayout.outlined?.borderColor}`,
  top: theme.spacing(3),
  right: 0,
  background: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: "translateX(50%)",
  width: theme.spacing(3),
  height: theme.spacing(3),
  zIndex: 1000,
  "&:hover": {
    background: "#c0c4c7",
  },
}));
// 侧边栏箭头图标
export const StyledArrowIcon = styled(Iconify, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  fontSize: theme.spacing(2),
  color: theme.palette.grey[500],
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  transform: open ? "rotate(90deg)" : "rotate(-90deg)",
}));

const Home = () => {
  const [collapsible, setCollapsed] = useState(false);
  const { sidebarCollapsed, toggleSidebarCollapsed } = useAppStore();
  useEffect(() => {
    console.log(collapsible, "collapsed");
  }, [collapsible]);
  // 侧边栏是否展开（与 sidebarCollapsed 相反）
  const open = !sidebarCollapsed;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        border: "1px solid red",
      }}
    >
      <Button onClick={() => setCollapsed(!collapsible)}>
        {collapsible ? "展开" : "收起"}
      </Button>
      <Box
        sx={{
          border: "1px solid red",
          width: sidebarCollapsed ? "100px" : "300px",
          height: "100vh",
          position: "relative",
          transition: "width 0.4s cubic-bezier(0,1,1,.62)",
        }}
      >
        <StyledToggleButton onClick={toggleSidebarCollapsed}>
          <StyledArrowIcon
            icon="eva:arrow-ios-downward-fill"
            open={open}
            className="icon-arrow"
          />
        </StyledToggleButton>
        <MenuDemo collapsed={sidebarCollapsed} />
      </Box>
      {/* <SidebarMenu
        id="SidebarMenu-1"
        items={menuItems}
        collapsible={collapsible}
      /> */}
    </Box>
  );
};

export default Home;
