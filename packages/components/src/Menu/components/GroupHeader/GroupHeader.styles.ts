import { styled, type SxProps, type Theme } from "@mui/material/styles";
import { ListSubheader } from "@mui/material";
import { Iconify } from "@fastest/components";

export interface GroupHeaderProps {
    title: string;
    onClick?: () => void;
    open: boolean;
    icon?: string;
    sx?: SxProps<Theme>;
}

export const StyledGroupHeader = styled(ListSubheader)(({ theme }) => ({
    backgroundColor: "transparent",
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,
    color: theme.palette.text.secondary,
    letterSpacing: "0.5px",
    lineHeight: theme.typography.pxToRem(16),
    padding: theme.spacing(2, 2, 1, 0.5),
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
    transition: theme.transitions.create("color", {
        duration: theme.transitions.duration.short,
    }),
    "&:hover": {
        color: theme.palette.text.primary,
        "& .icon-arrow": {
            opacity: 1,
            width: "16px",
            marginRight: theme.spacing(0.5),
        },
    },
}));

export const StyledArrowIcon = styled(Iconify, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
    fontSize: 18,
    width: 0,
    color: theme.palette.grey[500],
    opacity: 0,
    transition: "all 0.3s ease",
    transform: open ? "rotate(0deg)" : "rotate(-90deg)",
}));