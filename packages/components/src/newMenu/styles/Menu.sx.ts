import { Iconify } from "@components/iconify";
import type { Theme } from "@mui/material";
import { createMenuTheme } from "./theme";
import { styled } from "@mui/material/styles";

// 菜单容器样式
export const MenuBoxSx = {
  width: "100%",
  height: "90%",
  borderRadius: (theme: Theme) => theme.spacing(1),
  boxShadow: "var(--fast-menu-box-shadow) inset",
  // backgroundColor: "rgba(236, 240, 243, 1.00)",
  backgroundColor: (theme: Theme) => theme.palette.background.default,
  padding: (theme: Theme) => theme.spacing(0, 1, 0, 1),
  margin: 0,
  overflowY: "auto",
};

export const MenuBoxAnimateSx = {
  width: "100px",
};
// 菜单容器样式
export const MenuSubBoxSx = {
  width: "100%",
  height: "100%",
  borderRadius: (theme: Theme) => theme.spacing(1),
  boxShadow: "var(--fast-menu-box-shadow)",
  padding: (theme: Theme) => theme.spacing(0, 1, 0, 1),
  margin: 0,
  marginBottom: 1,
};

export const MenuSubHeaderSx = {
  backgroundColor: "transparent",
  height: "40px",
  fontSize: (theme: Theme) => theme.typography.pxToRem(14),
  fontWeight: 500,
  color: (theme: Theme) => theme.palette.text.secondary,
  letterSpacing: "0.5px",
  lineHeight: (theme: Theme) => theme.typography.pxToRem(16),
  padding: (theme: Theme) => theme.spacing(1, 0, 1, 0.5),
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  position: "relative",
  cursor: "pointer",
  userSelect: "none",
  transition: (theme: Theme) =>
    theme.transitions.create("color", {
      duration: theme.transitions.duration.short,
    }),
  "&:hover": {
    color: (theme: Theme) => theme.palette.text.primary,
    "& .icon-arrow": {
      opacity: 1,
      width: "16px",
      marginRight: (theme: Theme) => theme.spacing(0.5),
    },
  },
  // 箭头图标样式
  "&[aria-expanded='true'] .icon-arrow": { transform: "rotate(0deg)" },
  "&[aria-expanded='false'] .icon-arrow": { transform: "rotate(-90deg)" },
};

export const MenuSubHeaderAnimateSx = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  height: "60px",
  transition: "all 0.3s ease",
};

// 箭头图标样式
export const MenuArrowIconSx = {
  fontSize: 18,
  width: 0,
  color: (theme: Theme) => theme.palette.grey[500],
  opacity: 0,
  transition: "all 0.3s ease",
  // MenuSubHeaderSx 内补充
};

export const MenuItemSx = {
  padding: (theme: Theme) => theme.spacing(0.5),
  borderRadius: (theme: Theme) => theme.spacing(1),
  boxShadow: "var(--fast-menu-box-shadow) inset",
  margin: (theme: Theme) => theme.spacing(0, 0, 1, 0),
};
