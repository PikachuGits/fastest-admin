import { Box, Collapse, List, ListItem, ListItemText } from "@mui/material";
import { MenuBoxSx } from "./styles/Menu.sx";
import { SubHeader } from "./components";
import { Fragment, useState } from "react";
import menuData from "./data";

export const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    console.log("handleClick", open);
    setOpen(!open);
  };

  return (
    <Box sx={{ ...MenuBoxSx }}>
      <List>
        {menuData.map((item, index) => (
          <Fragment key={index}>
            <SubHeader
              title={item.subheader}
              onToggle={handleClick}
              open={open}
              tabIndex={index}
            />
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List>
                {item.items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Fragment>
        ))}
        {/* <SubHeader
          title="SubHeader"
          onToggle={handleClick}
          open={open}
          tabIndex={0}
        />
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <ListItemText primary="Item 1" />
            </ListItem>
          </List>
        </Collapse>
        <SubHeader
          title="SubHeader"
          onToggle={handleClick}
          open={open}
          tabIndex={1}
        />
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <ListItemText primary="Item 1" />
            </ListItem>
          </List>
        </Collapse> */}
      </List>
    </Box>
  );
};

export default Menu;
