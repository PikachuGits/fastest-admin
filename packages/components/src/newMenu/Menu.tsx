import { Box, Collapse, List } from "@mui/material";
import {
  MenuBoxAnimateSx,
  MenuBoxSx,
  MenuItemSx,
  MenuSubBoxSx,
} from "./styles/Menu.sx";
import { SubHeader, MenuItemGroup, MenuItemBox, MenuItem } from "./components";
import { useEffect, useState } from "react";
import menuData from "./data";
import { sxStyled } from "@components/utils/sx";
import type { MenuSection } from "./types";
import { useMenuStore } from "./stores";
import "./styles/global.less";

export const Menu = (props: any) => {
  const {
    expanded,
    collapsed,
    selected,
    toggleExpand,
    selectItem,
    setCollapsed,
    getExpanded,
  } = useMenuStore();

  useEffect(() => {
    setCollapsed(props.collapsed);
  }, [props.collapsed]);

  const data = menuData as unknown as MenuSection[];

  const handleSectionClick = (section: any) => {
    console.log("Section clicked:", section);
    toggleExpand(section.id);
  };

  const handleItemClick = (item: any) => {
    console.log("Menu item clicked:", item);
    // 如果有子项，切换展开状态；否则选中该项
    // If has children, toggle expand state; otherwise select the item
    if (item.children?.length) {
      toggleExpand(item.id.toString());
    } else {
      selectItem(item.id.toString());
      // 这里可以添加路由跳转或其他业务逻辑
      // Here you can add routing navigation or other business logic
    }
  };

  return (
    <Box sx={sxStyled(MenuBoxSx)}>
      <List>
        {data.map((value, index) => (
          <Box sx={sxStyled(MenuSubBoxSx)} key={index}>
            <SubHeader
              title={value.subheader}
              onToggle={() => handleSectionClick(value)}
              open={getExpanded(value.id.toString())}
              tabIndex={index}
              iconName={value.icon}
            />
            <MenuItemBox open={getExpanded(value.id.toString())}>
              {value.items.map((item, itemIndex) => {
                const isExpanded = getExpanded(item.id.toString());
                const isSelected = selected === item.id.toString();

                return (
                  <Box key={itemIndex} sx={sxStyled(MenuItemSx, {})}>
                    <MenuItem
                      item={item}
                      open={isExpanded}
                      selected={isSelected}
                      onClick={() => handleItemClick(item)}
                    />
                    {item.children && (
                      <MenuItemGroup
                        items={item}
                        list={item.children}
                        open={isExpanded}
                        level={1}
                        onItemClick={handleItemClick}
                        expanded={expanded}
                        selected={selected}
                      />
                    )}
                  </Box>
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
