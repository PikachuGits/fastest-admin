import { Box, Collapse, List } from "@mui/material";
import { MenuBoxSx, MenuItemSx, MenuSubBoxSx } from "./styles/Menu.sx";
import { SubHeader, MenuItemGroup, MenuItemBox } from "./components";
import { useState } from "react";
import menuData from "./data";
import { sxStyled } from "@components/utils/sx";
import type { MenuSection } from "./types";

export const Menu = () => {
  const [open, setOpen] = useState(true);
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>(
    {}
  );

  const data = menuData as unknown as MenuSection[];

  const handleClick = () => {
    console.log("handleClick", open);
    setOpen(!open);
  };

  const handleItemClick = (item: any, index: number) => {
    console.log("Menu item clicked:", item, index);
    // 这里可以添加路由跳转或其他业务逻辑
    // Here you can add routing navigation or other business logic
  };

  const handleToggleSubMenu = (itemPath: string) => {
    setExpandedStates((prev) => ({
      ...prev,
      [itemPath]: !prev[itemPath],
    }));
  };

  return (
    <Box sx={{ ...MenuBoxSx }}>
      <List>
        {data.map((value, index) => (
          <Box sx={sxStyled(MenuSubBoxSx)} key={index}>
            <SubHeader
              title={value.subheader}
              onToggle={handleClick}
              open={open}
              tabIndex={index}
            />
            <MenuItemBox open={open}>
              {value.items.map((item, index) => {
                return (
                  <MenuItemGroup
                    key={index}
                    items={item}
                    list={item.children || []}
                    open={open}
                    level={0}
                    onItemClick={handleItemClick}
                    expandedStates={expandedStates}
                    onToggleSubMenu={handleToggleSubMenu}
                  />
                );
              })}
            </MenuItemBox>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Menu;
