import type { Theme } from "@mui/material";

// 菜单容器样式
export const MenuBoxSx = {  
  width: "100%",  
  height: "100%",
  border: "1px solid #ccc",
  padding: 0,
  margin: 0,
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