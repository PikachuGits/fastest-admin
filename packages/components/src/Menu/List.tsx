import {
  Collapse,
  ListItemButton,
  List,
  ListSubheader,
  styled,
  type ListProps,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import { Iconify } from "../iconify";

import { Typography } from "@fastest/ui";
import MenuListItem from "./ListItem";

const ListBox = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
}));

const ArrowIcon = ({ open }: { open: boolean }) => {
  return (
    <Iconify
      icon={"eva:arrow-ios-downward-fill"}
      className={`
          transition-transform duration-300 ease-in-out
          ${open ? "rotate-0" : "rotate-[-90deg]"}
        `}
    />
  );
};

export default function MenuList(props: any) {
  const [openMarketing, setOpenMarketing] = useState(true);
  return (
    <ListBox component="nav" {...props}>
      <ListSubheader
        sx={{
          display: "inline-block",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
          lineHeight: "0",
        }}
        onClick={() => setOpenMarketing(!openMarketing)}
      >
        <ArrowIcon open={openMarketing} />
        Marketing
      </ListSubheader>
      <Collapse in={openMarketing}>
        <List sx={{ padding: 0, border: "1px solid #e0e0e0" }}>
          <MenuListItem
            icon={<Iconify icon="solar:gallery-add-bold" />}
            primary="Landing"
            secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
          <MenuListItem
            icon={<Iconify icon="solar:gallery-add-bold" />}
            primary="Level 2a"
            secondary="and typesetting industry."
          />
          <MenuListItem
            icon={<Iconify icon="solar:gallery-add-bold" />}
            primary="Level 2a"
            secondary="and typesetting industry."
          />
          <MenuListItem
            icon={<Iconify icon="solar:gallery-add-bold" />}
            primary="Level 2a"
            secondary="and typesetting industry."
          />
          <MenuListItem
            icon={<Iconify icon="solar:gallery-add-bold" />}
            primary="Blog"
            secondary="Only admin / manager can see this item."
          />
          <MenuListItem
            icon={<Iconify icon="solar:gallery-add-bold" />}
            primary="Blog"
            secondary="Only admin / manager can see this item."
          />
        </List>
      </Collapse>
      <List sx={{ padding: 0, border: "1px solid #e0e0e0" }}>
        <MenuListItem
          icon={<Iconify icon="solar:gallery-add-bold" />}
          primary="Landing"
          secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />
        <MenuListItem
          icon={<Iconify icon="solar:gallery-add-bold" />}
          primary="Level 2a"
          secondary="and typesetting industry."
        />
        <MenuListItem
          icon={<Iconify icon="solar:gallery-add-bold" />}
          primary="Level 2a"
          secondary="and typesetting industry."
        />
        <MenuListItem
          icon={<Iconify icon="solar:gallery-add-bold" />}
          primary="Level 2a"
          secondary="and typesetting industry."
        />
        <MenuListItem
          icon={<Iconify icon="solar:gallery-add-bold" />}
          primary="Blog"
          secondary="Only admin / manager can see this item."
        />
        <MenuListItem
          icon={<Iconify icon="solar:gallery-add-bold" />}
          primary="Blog"
          secondary="Only admin / manager can see this item."
        />
      </List>
    </ListBox>
  );
}
