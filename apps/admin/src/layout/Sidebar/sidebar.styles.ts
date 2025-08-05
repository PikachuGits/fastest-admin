import { styled } from '@mui/material/styles';
import { Box, IconButton } from "@mui/material";
import { Iconify } from "@fastest/components";

// 侧边栏箭头图标
export const StyledArrowIcon = styled(Iconify, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
    fontSize: 18,
    color: theme.palette.grey[500],
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: open ? "rotate(90deg)" : "rotate(-90deg)",
}));

// 侧边栏主容器
export const StyledSidebarContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
}));

// 侧边栏切换按钮
export const StyledToggleButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    border: `1px solid ${theme.customLayout.outlined?.borderColor}`,
    top: 8,
    right: 0,
    background: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateX(50%)',
    width: 22,
    height: 22,
    zIndex: 1000,
    "&:hover": {
        background: "#F4F6F8",
    },
}));

// 侧边栏导航容器
export const StyledSidebarNav = styled(Box)(({ theme }) => ({
    width: 'inherit',
    height: `calc(100vh - ${theme.customLayout.headerHeight}px)`,
    flexShrink: 0,
    padding: theme.spacing(2, 0.5, 2, 0.5),
    position: "fixed",
    top: `${theme.customLayout.headerHeight}px`,
    overflowY: "auto",
    borderRight: `1px solid ${theme.customLayout.outlined?.borderColor}`,
    background: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
        flexShrink: 0,
    },
}));
