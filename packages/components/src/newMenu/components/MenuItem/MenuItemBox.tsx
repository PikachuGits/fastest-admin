import { Collapse, List } from "@mui/material";
import type { SxProps } from "@mui/system";

export const MenuItemBox = ({
  open,
  children,
  sx,
  className,
}: {
  open: boolean;
  children: React.ReactNode;
  sx?: SxProps;
  className?: string;
}) => {
  return (
    <Collapse
      in={open}
      timeout="auto"
      unmountOnExit
      sx={sx}
      className={className}
    >
      <List sx={{ padding: 0 }}>{children}</List>
    </Collapse>
  );
};
