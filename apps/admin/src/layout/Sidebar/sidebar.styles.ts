import { styled } from "@mui/system";
import { Box, IconButton } from "@mui/material";
import { Iconify } from "@fastest/components";

// 导入类型扩展

export const StyledArrowIcon = styled(Iconify, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
    fontSize: 18,
    color: theme.palette.grey[500],
    transition: "all 0.3s ease",
    transform: open ? "rotate(90deg)" : "rotate(-90deg)",
}));

export const StyledSidebarContainer = styled(Box)(({ theme }) => ({
    width: 300,
    position: 'fixed',
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
}));

export const StyledToggleButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    top: (theme as any).customLayout.headerHeight + 12,
    right: 0,
    background: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateX(50%)',
    width: 26,
    height: 26,
    zIndex: 1000,
    "&:hover": {
        background: "#F4F6F8",
    },
}));

export const StyledSidebarNav = styled(Box)(({ theme }) => ({
    width: 300,
    height: `calc(100vh - ${(theme as any).customLayout.headerHeight}px)`,
    flexShrink: 0,
    padding: theme.spacing(2, 1, 2, 1),
    position: "fixed",
    top: `${(theme as any).customLayout.headerHeight}px`,
    overflowY: "auto",
    borderRight: `1px solid ${(theme as any).customLayout.outlined?.borderColor}`,
    [theme.breakpoints.down('md')]: {
        flexShrink: 0,
    },
}));
