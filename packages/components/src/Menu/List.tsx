import {
  Collapse,
  ListItemButton,
  List,
  ListSubheader,
  styled,
  type ListProps,
  ListItemText,
  ListItemIcon,
  type SxProps,
  type Theme,
} from "@mui/material";
import { useState } from "react";
import { Iconify } from "../iconify";

import { Typography } from "@fastest/ui";
import MenuListItem from "./ListItem";
import MuiListSubheader from "./ListSubheader";

const ListBox = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
}));
const ArrowIcon = ({
  open,
  className,
  ...props
}: {
  open: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Iconify
      icon={"eva:arrow-ios-downward-fill"}
      className={`transition-all duration-300 ease-in-out ${
        open ? "rotate-0" : "rotate-[-90deg]"
      } ${className}`}
      {...props}
    />
  );
};
export default function MenuList(props: any) {
  const [openMarketing, setOpenMarketing] = useState(true);
  const [openLanding, setOpenLanding] = useState(false);
  return (
    <ListBox component="nav" {...props}>
      <MuiListSubheader
        open={openMarketing}
        onOpen={() => setOpenMarketing(!openMarketing)}
      />
      <Collapse in={openMarketing}>
        <List sx={{ padding: 0, border: "1px solid #e0e0e0" }}>
          <MenuListItem
            icon={<Iconify icon="solar:gallery-add-bold" />}
            primary="Landing"
            // secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
          <MenuListItem
            icon={<Iconify icon="solar:gallery-add-bold" />}
            primary="Level 2a"
            secondary="and typesetting industry."
            onClick={() => setOpenLanding(!openLanding)}
            subIcon={<ArrowIcon open={openLanding} />}
          />
          <Collapse in={openLanding} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              <MenuListItem
                // icon={<Iconify icon="solar:add-folder-bold" />}
                primary="Level 2a"
                secondary="and typesetting industry."
              />
            </List>
          </Collapse>
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
