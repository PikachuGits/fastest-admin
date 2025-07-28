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
import {
  StyledListItemButton,
  StyledListItemText,
  StyledArrowIcon,
  type MenuItemProps,
} from "./MenuItem.styles";
import "../../styles/index.less";



// ==================== 主组件 Main Component ====================

/**
 * MenuItem 主组件
 * Main MenuItem component
 * 
 * 渲染单个菜单项，包括图标、文本、徽章和箭头等元素
 * Renders a single menu item including icon, text, badge, and arrow elements
 * 
 * @param props - 组件属性 Component props
 * @returns 渲染的菜单项 Rendered menu item
 */
export const MenuItem = ({
  icon,
  primary,
  secondary,
  level = 0,
  selected = false,
  parentSelected = false,
  hasSubItems = false,
  open = false,
  onToggle,
  onClick,
  numberBadge,
  badgeColor = "default",
  disabled = false,
}: MenuItemProps) => {
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
      selected={selected}
      parentSelected={parentSelected}
      hasSubItems={hasSubItems}
      onClick={handleClick}
      disabled={disabled}
      data-level={level == 0 ? "false" : "true"}
      className="fast-menu-item-container-sub-child"
    >
      {/* 菜单项图标 Menu item icon */}
      {icon && (
        <ListItemIcon>
          <Iconify
            icon={icon}
            className="w-full h-full"
            sx={{
              color: (selected || parentSelected) ? "#2E7D32" : disabled ? "#BDBDBD" : "#757575",
            }}
          />
        </ListItemIcon>
      )}

      {/* 菜单项文本内容 Menu item text content */}
      <StyledListItemText
        primary={
          primary && (
            <span className="text-sm truncate">{primary}</span>
          )
        }
        secondary={
          secondary && (
            <span className="inline-block text-xs truncate w-full">
              {secondary}
            </span>
          )
        }
      />

      {/* 右侧操作区域：徽章和箭头 Right action area: badge and arrow */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* 数字徽章 Number badge */}
        {numberBadge && <NumberChip number={numberBadge} color={badgeColor} />}
        {/* 展开/折叠箭头 Expand/collapse arrow */}
        {hasSubItems && (
          <StyledArrowIcon
            icon="eva:arrow-ios-downward-fill"
            open={open}
            className="icon-arrow"
          />
        )}
      </Box>
    </StyledListItemButton>
  );
};
