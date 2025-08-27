import { Box, Collapse, List } from "@mui/material";
import { sxStyled } from "@components/utils/sx";
import { MenuItemSx } from "../../styles/Menu.sx";
import { MenuItem } from "./MenuItem";
import { Fragment, useMemo } from "react";
import type { MenuItem as MenuItemType } from "../../types";
import { MenuItemBox } from "./MenuItemBox";

/**
 * MenuItemGroup 组件属性接口
 * MenuItemGroup component props interface
 */
export interface MenuItemGroupProps {
  /** 菜单项列表 Menu items list */
  items: MenuItemType;
  /** 菜单项列表 Menu items list */
  list: MenuItemType[];
  /** 是否展开 Whether expanded */
  open: boolean;
  /** 递归层级（可选，用于控制嵌套样式）Recursive level (optional, for controlling nested styles) */
  level?: number;
  /** 菜单项点击回调 Menu item click callback */
  onItemClick?: (item: MenuItemType, index: number) => void;
  /** 子菜单展开状态映射 Sub-menu expanded states mapping */
  expandedStates?: Record<string, boolean>;
  /** 控制子菜单展开的回调 Callback to control sub-menu expansion */
  onToggleSubMenu?: (itemPath: string) => void;
  /** 菜单项唯一标识符 Menu item unique identifier */
  serial: number;

  [key: string]: any;
}

/**
 * MenuItemGroup 组件 - 封装菜单项组的渲染逻辑
 * MenuItemGroup component - Encapsulates menu item group rendering logic
 */
export const MenuItemGroup = ({
  items,
  list,
  open,
  level = 0,
  onItemClick,
  expandedStates = {},
  onToggleSubMenu,
  ...props
}: MenuItemGroupProps) => {
  // 优化的点击处理器
  const handleItemClick = useMemo(() => {
    return (item: MenuItemType, index: number) => {
      onItemClick?.(item, index);
    };
  }, [onItemClick]);

  // 生成子菜单路径的辅助函数
  const generateItemPath = (item: MenuItemType, index: number) => {
    return `${level}-${index}-${item.path || item.title}`;
  };

  // 检查子菜单是否展开
  const isSubMenuOpen = (itemPath: string) => {
    return expandedStates[itemPath] ?? open;
  };

  // 处理子菜单展开切换
  const handleToggleSubMenu = (itemPath: string) => {
    onToggleSubMenu?.(itemPath);
  };

  console.log(props, "props");
  return (
    <MenuItemBox open={open}>
      <Box sx={sxStyled(level == 0 ? MenuItemSx : {})}>
        <MenuItem
          item={items}
          isLast={props.key === list.length - 1}
          // isLast={index === items.length - 1}
          // onClick={() => handleItemClick(item, index)}
          open={open}
        />
        {list &&
          list.length > 0 &&
          list.map((item, index) => {
            // const itemPath = generateItemPath(item, index);
            // const hasChildren = item.children && item.children.length > 0;
            const subMenuOpen = isSubMenuOpen(item.path);
            return (
              <MenuItemGroup
                items={item}
                list={item.children!}
                open={subMenuOpen}
                level={level + 1}
                onItemClick={onItemClick}
                expandedStates={expandedStates}
                onToggleSubMenu={onToggleSubMenu}
                key={index}
              />
            );
          })}
      </Box>
    </MenuItemBox>
  );
};

export default MenuItemGroup;
