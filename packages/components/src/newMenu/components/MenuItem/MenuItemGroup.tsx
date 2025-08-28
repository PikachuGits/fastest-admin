import { Box, Collapse, List } from "@mui/material";
import { sxStyled } from "@components/utils/sx";
import { MenuItemSx } from "../../styles/Menu.sx";
import { MenuItem } from "./MenuItem";
import { Fragment, useMemo } from "react";
import type { MenuItem as MenuItemType } from "../../types";
import { MenuItemBox } from "./MenuItemBox";
import styles from "../../styles/index.module.less";

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
  onItemClick?: (item: MenuItemType) => void;
  /** 展开状态映射 Expanded states mapping */
  expanded?: Record<string, boolean>;
  /** 选中状态 Selected state */
  selected?: string | null;

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
  expanded = {},
  selected,
  ...props
}: MenuItemGroupProps) => {
  // 优化的点击处理器
  const handleItemClick = useMemo(() => {
    return (item: MenuItemType) => {
      onItemClick?.(item);
    };
  }, [onItemClick]);

  return (
    <MenuItemBox
      open={open}
      className={styles["fast-menu-item-container-sub"]}
      sx={{ marginLeft: "30px" }}
    >
      {list &&
        list.length > 0 &&
        list.map((item, index) => {
          const isExpanded = !expanded[item.id.toString()];
          const isSelected = selected === item.id.toString();

          return (
            <Box key={index} sx={{ paddingTop: 1 }}>
              <MenuItem
                level={level}
                item={item}
                open={isExpanded}
                selected={isSelected}
                onClick={() => handleItemClick(item)}
              />
              {item.children && item.children.length > 0 && (
                <MenuItemGroup
                  items={item}
                  list={item.children}
                  open={isExpanded}
                  level={level + 1}
                  onItemClick={onItemClick}
                  expanded={expanded}
                  selected={selected}
                />
              )}
            </Box>
          );
        })}
    </MenuItemBox>
  );
};

export default MenuItemGroup;
