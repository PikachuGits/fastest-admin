import { ListSubheader } from "@mui/material";
import { MenuGroupHeaderSx } from "../styles/menu.sx";
import { Iconify } from "../../iconify";
import type { GroupHeaderProps } from "../types";

export const GroupHeader = ({
  title,
  onClick,
  open = false,
}: GroupHeaderProps) => {
  return (
    <ListSubheader
      sx={{
        ...MenuGroupHeaderSx,
        transform: open ? "rotate(0deg)" : "rotate(-90deg)",
      }}
      onClick={onClick}
    >
      <Iconify icon="eva:arrow-ios-downward-fill" className="icon-arrow" />
      <span className="text-xs">{title}</span>
    </ListSubheader>
  );
};
