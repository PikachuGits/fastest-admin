import { Iconify } from "@components/iconify";
import type { Theme } from "@mui/material";
import { createMenuTheme } from "./theme";
import { styled } from "@mui/material/styles";

// 菜单容器样式
export const MenuBoxSx = {
  width: "100%",
  height: "90%",
  border: "1px solid #ccc",
  borderRadius: (theme: Theme) => theme.spacing(1),
  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5) inset",
  backgroundColor: "rgba(236, 240, 243, 1.00)",
  // backgroundColor: (theme: Theme) => theme.palette.background.default,
  padding: (theme: Theme) => theme.spacing(0, 1, 0, 1),
  margin: 0,
  overflowY: "auto",
};
// 菜单容器样式
export const MenuSubBoxSx = {
  width: "100%",
  height: "100%",
  // backgroundColor: "#fff",
  // border: "1px solid #ccc",
  borderRadius: (theme: Theme) => theme.spacing(1),
  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5) ",
  padding: (theme: Theme) => theme.spacing(0, 1, 0, 1),
  margin: 0,
  marginBottom: 1,
};

export const MenuSubHeaderSx = {
  backgroundColor: "transparent",
  fontSize: (theme: Theme) => theme.typography.pxToRem(12),
  fontWeight: 500,
  color: (theme: Theme) => theme.palette.text.secondary,
  letterSpacing: "0.5px",
  lineHeight: (theme: Theme) => theme.typography.pxToRem(16),
  padding: (theme: Theme) => theme.spacing(1, 0, 0, 0.5),
  textTransform: "uppercase",
  display: "inline-flex",
  alignItems: "center",
  position: "relative",
  cursor: "pointer",
  userSelect: "none",
  transition: (theme: Theme) => theme.transitions.create("color", {
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
}

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
  margin: (theme: Theme) => theme.spacing(1, 0),
  borderRadius: (theme: Theme) => theme.spacing(1),
  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5) inset",
  // boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5) inset",

  // boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.5) inset",
  // backgroundColor: "#fff",
};

