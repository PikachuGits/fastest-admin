import React, { useState, useCallback, useEffect } from "react";
import { SidebarMenu, useMenuHelpers } from "@fastest/components";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
  Switch,
  FormControlLabel,
  Chip,
  Divider,
  Alert,
  Paper,
} from "@mui/material";

// ==================== 测试数据 Test Data ====================

const menuItems = [
  {
    subheader: "Marketing",
    items: [
      {
        title: "Landing",
        path: "#landing",
        icon: "solar:home-angle-bold-duotone",
        info: ["info.landing", "+1"],
        roles: ["admin"],
        caption:
          "Display only admin roleDisplay only admin roleDisplay only admin roleDisplay only admin role",
      },
      {
        title: "Services",
        path: "#services",
        icon: "solar:home-angle-bold-duotone",
        roles: ["admin", "user"],
      },
      {
        title: "Blog",
        path: "#blog",
        icon: "solar:home-angle-bold-duotone",
        info: ["info.blog", "+2"],
        children: [
          {
            title: "Item 1",
            path: "#blog/item-1",
            caption: "Display caption",
            info: ["info.blog.item1", "+3"],
          },
          {
            title: "Item 2",
            path: "#blog/item-2",
          },
        ],
      },
    ],
  },
  {
    subheader: "Travel",
    items: [
      {
        title: "About",
        path: "#about",
        icon: "solar:gallery-circle-outline",
      },
      {
        title: "Contact",
        path: "#contact",
        icon: "solar:gallery-circle-outline",
      },
      {
        title: "Level",
        path: "#level",
        icon: "solar:gallery-circle-outline",
        children: [
          {
            title: "Level 2a",
            path: "#level/2a",
            icon: "solar:gallery-circle-outline",
            caption: "This is the caption",
            children: [
              {
                title: "Level 3a",
                path: "#level/2a/3a",
              },
              {
                title: "Level 3b",
                path: "#level/2a/3b",
                children: [
                  {
                    title: "Level 4a",
                    path: "#level/2a/3b/4a",
                  },
                  {
                    title: "Level 4b",
                    path: "#level/2a/3b/4b",
                  },
                ],
              },
              {
                title: "Level 3c",
                path: "#level/2a/3c",
              },
            ],
          },
          {
            title: "Level 2b",
            path: "#level/2b",
            icon: "solar:gallery-circle-outline",
          },
          {
            title: "Level 2c",
            path: "#level/2c",
            icon: "solar:gallery-circle-outline",
          },
        ],
      },
    ],
  },
];

const Home = () => {
  const [collapsible, setCollapsed] = useState(false);

  useEffect(() => {
    console.log(collapsible, "collapsed");
  }, [collapsible]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Button onClick={() => setCollapsed(!collapsible)}>
        {collapsible ? "展开" : "收起"}
      </Button>
      <SidebarMenu
        id="SidebarMenu-1"
        items={menuItems}
        collapsible={collapsible}
      />
    </Box>
  );
};

export default Home;
