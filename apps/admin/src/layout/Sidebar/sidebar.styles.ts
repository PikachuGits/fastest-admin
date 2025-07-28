import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import { Iconify } from "@fastest/components";


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
    position: 'relative',
    border: '1px solid #c01',
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
}));

export const StyledToggleButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    top: theme.customLayout.headerHeight,
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
    height: `calc(100vh - ${theme.customLayout.headerHeight}px)`,
    flexShrink: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: "fixed",
    top: `${theme.customLayout.headerHeight}px`,
    overflowY: "auto",
    borderRight: '1px solid #e0e0e0',
    [theme.breakpoints.down('md')]: {
        flexShrink: 0,
    },
}));
