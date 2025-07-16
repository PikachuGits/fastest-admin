import {
  Paper,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  styled,
} from "@mui/material";
import { Iconify, text } from "@fastest/components";
import { Typography } from "@fastest/ui";
// import {
//   ExpandLess,
//   ExpandMore,
//   Inbox,
//   Drafts,
//   Send,
//   StarBorder,
//   Chat,
// } from "@mui/icons-material";
import { useState } from "react";

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

const ListItemTextFlex = styled(ListItemText)(({ theme }) => ({
  display: "inline-flex",
  flex: "1 1 auto",
  flexDirection: "column",
}));

const NestedNav = () => {
  const [openMarketing, setOpenMarketing] = useState(true);
  const [openTravel, setOpenTravel] = useState(true);
  const [openLevel, setOpenLevel] = useState(true);
  const [openLevel2a, setOpenLevel2a] = useState(true);
  const [openLevel3b, setOpenLevel3b] = useState(true);

  return (
    <Paper variant="outlined" sx={{ p: 2 }} square className="max-w-[320px]">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
      >
        {/* --- Marketing --- */}
        <ListSubheader onClick={() => setOpenMarketing(!openMarketing)}>
          <ArrowIcon open={openMarketing} />
          Marketing
        </ListSubheader>
        <Collapse in={openMarketing}>
          <List>
            <ListItemButton
              component={"a"}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxSizing: "border-box",
                tapHighlightColor: "transparent",
                backgroundColor: "transparent",
                outline: 0,
                // border: 0,
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
              }}
            >
              <ListItemIcon sx={{ mr: 1, fontSize: "24px", minWidth: 0 }}>
                <Iconify icon="solar:gallery-add-bold" />
              </ListItemIcon>
              <span
                style={{
                  display: "inline-flex",
                  flex: "1 1 auto",
                  flexDirection: "column",
                }}
              >
                <span style={{ fontSize: "14px" }}>Landing</span>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
              </span>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Iconify icon="solar:gallery-add-bold" />
              </ListItemIcon>
              <ListItemTextFlex
                primary="Level 2a"
                secondary={
                  <Typography>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>{/* <Inbox /> */}</ListItemIcon>
              <ListItemText
                primary="Blog"
                secondary="Only admin / manager can see this item."
              />
            </ListItemButton>
          </List>
        </Collapse>
        {/* --- Travel --- */}
        <ListSubheader onClick={() => setOpenTravel(!openTravel)}>
          <ArrowIcon open={openTravel} />
          Travel
        </ListSubheader>
        <Collapse in={openTravel} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* <Send /> */}</ListItemIcon>
              <ListItemText primary="About" secondary="+4" />
            </ListItemButton>
            <ListItemButton disabled>
              <ListItemIcon>{/* <Drafts /> */}</ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
            {/* Level */}
            <ListItemButton onClick={() => setOpenLevel(!openLevel)}>
              <ListItemIcon>{/* <Inbox /> */}</ListItemIcon>
              <ListItemText primary="Level" />
              <ArrowIcon open={openLevel} />
            </ListItemButton>
            <Collapse in={openLevel} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* Level 2a */}
                <ListItemButton onClick={() => setOpenLevel2a(!openLevel2a)}>
                  <ListItemIcon>
                    <Iconify icon="solar:gallery-add-bold" />
                  </ListItemIcon>
                  <ListItemTextFlex
                    primary="Level 2a"
                    secondary={
                      <Typography>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </Typography>
                    }
                  />
                  <ArrowIcon open={openLevel2a} />
                </ListItemButton>
                <Collapse in={openLevel2a} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    <ListItemButton>
                      <ListItemText primary="Level 3a" />
                    </ListItemButton>

                    {/* Level 3b */}
                    <ListItemButton
                      onClick={() => setOpenLevel3b(!openLevel3b)}
                    >
                      <ListItemText primary="Level 3b" />
                      <ArrowIcon open={openLevel3b} />
                    </ListItemButton>
                    <Collapse in={openLevel3b} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding sx={{ pl: 4 }}>
                        <ListItemButton disabled>
                          <ListItemText primary="Level 4a" />
                        </ListItemButton>
                        <ListItemButton selected>
                          <ListItemText primary="Level 4b" />
                        </ListItemButton>
                      </List>
                    </Collapse>

                    <ListItemButton>
                      <ListItemText primary="Level 3c" />
                    </ListItemButton>
                  </List>
                </Collapse>

                {/* Level 2b */}
                <ListItemButton>
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText primary="Level 2b" />
                </ListItemButton>

                {/* Level 2c */}
                <ListItemButton>
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText primary="Level 2c" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Collapse>

        {/* More */}
        <ListItemButton>
          <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
          <ListItemText primary="More" />
        </ListItemButton>
      </List>

      <Divider />

      {/* Chat */}
      <List>
        <ListItemButton>
          <ListItemIcon>{/* <Chat /> */}</ListItemIcon>
          <ListItemText
            primary="Chat"
            secondary="Praesent porttitor nulla vitae posuere"
          />
        </ListItemButton>
      </List>
    </Paper>
  );
};

export default NestedNav;
