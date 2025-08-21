import type { SxProps } from "@mui/material";

/**
 * 菜单基础层级列表样式
 * Base layer list style for menu
 */
export const MenuBaseLayerListSx: SxProps = {
  height: "100%",
  padding: (theme: any) => theme.spacing(0,0,2,0),
  border: "1px solid red",
};  


export const MenuBaseLayerListItemSx: SxProps = {
  height: "100%",
  pb: (theme: any) => theme.spacing(2),
};



export const MenuGroupHeaderSx: SxProps = {
    backgroundColor: "transparent",
    fontSize: (theme: any) => theme.typography.pxToRem(12),
    fontWeight: 500,
    color: (theme: any) => theme.palette.text.secondary,
    letterSpacing: "0.5px",
    lineHeight: (theme: any) => theme.typography.pxToRem(16),
    padding: (theme: any) => theme.spacing(1, 0, 0, 0.5),
    textTransform: "uppercase",
    display: "inline-flex",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
    transition: (theme: any) => theme.transitions.create("color", {
        duration: theme.transitions.duration.short,
    }),
    "&:hover": {
        color: (theme: any) => theme.palette.text.primary,
        "& .icon-arrow": {
            opacity: 1,
            width: "16px",
            marginRight: (theme: any) => theme.spacing(0.5),
        },
    },
};


export const ArrowIconSx: SxProps = {
    fontSize: 18,
    width: 0,
    color: (theme: any) => theme.palette.grey[500],
    opacity: 0,
    transition: "all 0.3s ease",
};