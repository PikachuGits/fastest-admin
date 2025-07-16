import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { Typography } from "@fastest/ui";

const MenuListItemButton = styled(ListItemButton)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  tapHighlightColor: "transparent",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  appearance: "none",
  textDecoration: "none",
  fontFamily:
    '"Public Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  padding: "4px 8px 4px 12px",
  borderRadius: "8px",
  minHeight: "44px",
  width: "100%",
}));

export default function MenuListItem(props: any) {
  return (
    <MenuListItemButton {...props}>
      <ListItemIcon sx={{ mr: 1, fontSize: "24px", minWidth: 0 }}>
        {props.icon}
      </ListItemIcon>
      <span
        style={{
          display: "inline-flex",
          flex: "1 1 auto",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: "14px" }}>{props.primary}</span>
        <Typography>{props.secondary}</Typography>
      </span>
    </MenuListItemButton>
  );
}
