/**
 * MenuItem 组件
 * MenuItem Component
 * 
 * 用于显示单个菜单项的图标、主次文本、徽章和展开/折叠箭头
 * Used to display individual menu items with icon, primary/secondary text, badge, and expand/collapse arrow
 */

import { ListItemIcon, Box } from "@mui/material";
import { Iconify } from "@fastest/components";
import { NumberChip } from "../NumberChip";
import { parseInfoBadge, getBadgeColor, hasChildren } from "../../../utils/menuHelpers";
import {
  StyledListItemButton,
  StyledListItemText,
  StyledArrowIcon,
  type MenuItemProps,
} from "./MenuItem.styles";
import "../../../styles/index.less";



// ==================== 主组件 Main Component ====================

/**
 * MenuItem 主组件（优化版）
 * Main MenuItem component (optimized)
 * 
 * 渲染单个菜单项，内部计算状态，简化props传递
 * Renders a single menu item with internal state calculation and simplified props
 * 
 * @param props - 组件属性 Component props
 * @returns 渲染的菜单项 Rendered menu item
 */
export const MenuItem = ({
  item,
  itemPath,
  selectedItem,
  level = 0,
  hasSubItems = false,
  open = false,
  collapsed = true,
  onToggle,
  onClick,
  disabled = false,
}: MenuItemProps) => {
  // ==================== 内部状态计算 Internal State Calculations ====================

  /**
   * 检查当前菜单项是否被选中
   * Check if current menu item is selected
   */
  const isSelected = selectedItem === itemPath;

  /**
   * 检查是否有子菜单被选中（父级选中状态）
   * Check if any sub-menu item is selected (parent selected state)
   */
  const isParentSelected = hasSubItems && selectedItem.startsWith(itemPath + '.') && selectedItem !== itemPath;

  /**
   * 解析徽章数字
   * Parse badge number from item info
   */
  const badge = parseInfoBadge(item.info);

  /**
   * 获取图标（如果存在）
   * Get icon if exists
   */
  const actualIcon = item.icon ? item.icon : undefined;

  /**
   * 获取徽章颜色
   * Get badge color
   */
  const badgeColor = getBadgeColor(badge);
  // ==================== 事件处理 Event Handlers ====================

  /**
   * 处理菜单项点击事件
   * Handle menu item click event
   * 
   * 根据是否有子项决定是切换展开状态还是触发点击事件
   * Decides whether to toggle expand state or trigger click event based on whether has sub-items
   */
  const handleClick = () => {
    if (hasSubItems && onToggle) {
      onToggle();
    } else if (onClick) {
      onClick();
    }
  };

  // ==================== 组件渲染 Component Render ====================

  return (
    <StyledListItemButton
      level={level}
      selected={isSelected}
      parentSelected={isParentSelected}
      hasSubItems={hasSubItems}
      onClick={handleClick}
      disabled={disabled}
      collapsed={collapsed}
      data-level={level == 0 ? "false" : "true"}
      className="fast-menu-item-container-sub-child"
    >
      {/* 菜单项图标 Menu item icon */}
      {actualIcon && (
        <ListItemIcon>
          <Iconify
            icon={actualIcon as any}
            className="w-full h-full"
            sx={{
              color: (isSelected || isParentSelected) ? "#2E7D32" : disabled ? "#BDBDBD" : "#757575",
            }}
          />
        </ListItemIcon>
      )}
      {/* 菜单项文本内容 Menu item text content */}
      {!collapsed ? (
        <StyledListItemText
          primary={
            item.title && (
              <span className="text-sm truncate">{item.title}</span>
            )
          }
          secondary={
            item.caption && (
              <span className="inline-block text-xs truncate w-full">
                {item.caption}
              </span>
            )
          }
        />
      ) : <StyledListItemText
        primary={
          item.title && (
            <span className="text-sm truncate">{item.title}</span>
          )
        }
      />}

      {/* 右侧操作区域：徽章和箭头 Right action area: badge and arrow */}
      {!collapsed && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* 数字徽章 Number badge */}
          {badge && <NumberChip number={badge} color={badgeColor} />}
          {/* 展开/折叠箭头 Expand/collapse arrow */}
          {hasSubItems && (
            <StyledArrowIcon
              icon="eva:arrow-ios-downward-fill"
              open={open}
              className="icon-arrow"
            />
          )}
        </Box>)}
    </StyledListItemButton>
  );
};
