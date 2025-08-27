import { Collapse, List } from "@mui/material";

export const MenuItemBox = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List sx={{ padding: 0 }}>{children}</List>
    </Collapse>
  );
};
