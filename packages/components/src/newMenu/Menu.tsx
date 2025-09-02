import {
  Box,
  Collapse,
  List,
  Paper,
  Popper,
  ClickAwayListener,
  Typography,
  Divider,
} from "@mui/material";
import {
  MenuBoxAnimateSx,
  MenuBoxSx,
  MenuItemSx,
  MenuSubBoxSx,
} from "./styles/Menu.sx";
import {
  SubHeader,
  MenuItemGroup,
  MenuItemBox,
  MenuItem,
  MenuFloating,
} from "./components";
import { useEffect, useState, useRef } from "react";
import menuData from "./data";
import { sxStyled } from "@components/utils/sx";
import type { MenuSection } from "./types";
import { useMenuStore } from "./stores";
import {
  shouldMenuItemShowSelected,
  isMenuSectionContainsSelected,
} from "./utils/menuUtils";
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

  // 悬浮菜单状态管理 - 支持多级菜单
  const [activeMenus, setActiveMenus] = useState<
    Array<{
      id: string;
      anchorEl: HTMLElement;
      items: any[];
      level: number;
      title?: string;
    }>
  >([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // 悬浮菜单事件处理 - 支持多级级联
  const handleSectionMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    section: any
  ) => {
    if (!collapsed) return; // 只在收起状态下启用悬浮菜单

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // 显示第一级菜单
    setActiveMenus([
      {
        id: section.id.toString(),
        anchorEl: event.currentTarget,
        items: section.items,
        level: 0,
        title: section.subheader,
      },
    ]);
  };

  const handleSectionMouseLeave = () => {
    if (!collapsed) return;

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenus([]);
    }, 100); // 100ms 延迟，防止意外关闭
  };

  const handleMenuItemMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    item: any,
    level: number
  ) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // 如果有子菜单，显示下一级
    if (item.children && item.children.length > 0) {
      setActiveMenus((prev) => {
        // 保留当前级别及之前的菜单，移除之后的菜单
        const currentLevelMenus = prev.slice(0, level + 1);
        // 添加新的子菜单
        return [
          ...currentLevelMenus,
          {
            id: item.id.toString(),
            anchorEl: event.currentTarget,
            items: item.children,
            level: level + 1,
            title: item.title,
          },
        ];
      });
    } else {
      // 没有子菜单，移除后续级别的菜单
      setActiveMenus((prev) => prev.slice(0, level + 1));
    }
  };

  const handleMenuMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenus([]);
    }, 150); // 稍长的延迟，允许用户移动到子菜单
  };

  const handlePopperMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleClickAway = () => {
    setActiveMenus([]);
  };

  return (
    <Box sx={sxStyled(MenuBoxSx)}>
      <List>
        {data.map((value, index) => (
          <Box
            sx={sxStyled(MenuSubBoxSx, {})}
            key={index}
            onMouseEnter={(e) => handleSectionMouseEnter(e, value)}
          >
            <Box onMouseLeave={handleSectionMouseLeave}>
              <SubHeader
                title={value.subheader}
                onToggle={() => handleSectionClick(value)}
                open={getExpanded(value.id.toString())}
                tabIndex={index}
                iconName={value.icon}
                selected={isMenuSectionContainsSelected(value, selected)}
              />
            </Box>
            <MenuItemBox open={getExpanded(value.id.toString())}>
              {value.items.map((item, itemIndex) => {
                const isExpanded = getExpanded(item.id.toString());
                const isSelected = shouldMenuItemShowSelected(item, selected);

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

      {/* 级联悬浮菜单 - 使用封装的 MenuFloating 组件 */}
      <MenuFloating
        collapsed={collapsed}
        activeMenus={activeMenus}
        selected={selected}
        onPopperMouseEnter={handlePopperMouseEnter}
        onMenuMouseLeave={handleMenuMouseLeave}
        onMenuItemMouseEnter={handleMenuItemMouseEnter}
        onItemClick={handleItemClick}
        onClickAway={handleClickAway}
      />
    </Box>
  );
};

export default Menu;
