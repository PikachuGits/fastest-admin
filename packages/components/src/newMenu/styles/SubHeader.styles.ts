import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MenuBox = styled(Box)<{
  selected?: boolean;
  disabled?: boolean;
  collapsed?: boolean;
  isMobile?: boolean;
}>(({ theme, selected, disabled, collapsed, isMobile }) => {
  const baseColor = selected ? theme.palette.primary.main : "inherit";
  const hoverColor = disabled ? "inherit" : theme.palette.primary.main;

  return {
    display: "flex",
    alignItems: "center",
    flexWrap: collapsed || isMobile ? "wrap" : "nowrap",
    justifyContent: collapsed || isMobile ? "center" : "flex-start",
    paddingLeft: collapsed || isMobile ? 0 : theme.spacing(1),
    width: "100%",
    height: "100%",
    marginTop: collapsed || isMobile ? theme.spacing(1) : 0,
    transition: "all 0.2s ease-in-out",
    color: baseColor,
    ".icon-menu": { color: baseColor },
    "&:hover": {
      color: hoverColor,
      ".icon-menu": { color: hoverColor },
    },
  };
});
