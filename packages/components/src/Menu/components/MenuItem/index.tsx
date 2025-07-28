/**
 * MenuItem 组件
 * MenuItem Component
 * 
 * 用于显示单个菜单项的图标、主次文本、徽章和展开/折叠箭头
 * Used to display individual menu items with icon, primary/secondary text, badge, and expand/collapse arrow
 */

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Box,
  type SxProps,
  type Theme,
} from "@mui/material";
import { Iconify } from "../../../iconify";
import { NumberChip, type NumberChipColor } from "../NumberChip";
import "../../styles/index.less";

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuItem 组件属性接口
 * MenuItem component props interface
 * 
 * 定义菜单项组件的所有属性和配置选项
 * Defines all properties and configuration options for the menu item component
 */
export interface MenuItemProps {
  /** 图标名称或组件 Icon name or component */
  icon?: import("../../../iconify").IconifyProps["icon"];
  /** 主要文本内容 Primary text content */
  primary: string;
  /** 次要文本内容（可选） Secondary text content (optional) */
  secondary?: string;
  /** 菜单层级深度 Menu nesting level depth */
  level?: number;
  /** 是否被选中 Whether the item is selected */
  selected?: boolean;
  /** 父级是否被选中（当子菜单被选中时） Whether parent is selected (when child menu is selected) */
  parentSelected?: boolean;
  /** 是否有子菜单项 Whether the item has sub-items */
  hasSubItems?: boolean;
  /** 是否展开（仅当有子项时有效） Whether expanded (only valid when has sub-items) */
  open?: boolean;
  /** 展开/折叠切换回调函数 Toggle expand/collapse callback function */
  onToggle?: () => void;
  /** 点击回调函数 Click callback function */
  onClick?: () => void;
  /** 数字徽章值 Number badge value */
  numberBadge?: number;
  /** 徽章颜色 Badge color */
  badgeColor?: NumberChipColor;
  /** 是否禁用 Whether disabled */
  disabled?: boolean;
}

// ==================== 样式组件 Styled Components ====================

/**
 * 样式化的列表项按钮组件
 * Styled list item button component
 * 
 * 提供菜单项的基础样式，包括选中状态、层级缩进等
 * Provides basic styles for menu items, including selected state, level indentation, etc.
 */
const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => !['level', 'selected', 'hasSubItems', 'parentSelected'].includes(prop as string),
})<{
  level?: number;
  selected?: boolean;
  hasSubItems?: boolean;
  parentSelected?: boolean;
}>(({ theme, level = 0, selected, hasSubItems, parentSelected }) => ({
  // 基础布局样式 Basic layout styles
  marginTop: level ? theme.spacing(0.5) : 0,
  padding: " 4px 8px 4px 12px",
  minHeight: 44,
  borderRadius: theme.spacing(1),

  // 选中状态样式 Selected state styles
  ...((selected || parentSelected) && {
    // 一级菜单项（level=0）使用自定义绿色主题
    ...(level === 0 && {
      backgroundColor: "rgba(46, 125, 50, 0.08)",
      color: "#2E7D32",
      fontWeight: 600,
      "&:hover": {
        backgroundColor: "rgba(46, 125, 50, 0.12)",
      },
      "& .MuiListItemText-primary": {
        color: "#2E7D32 !important",
        fontWeight: "600 !important",
      },
      "& .MuiListItemText-root": {
        color: "#2E7D32",
      },
    }),
    // 二级及以下菜单项：直接选中时使用默认Button效果，作为父级选中时使用绿色主题
    ...(level > 0 && {
      ...(selected && {
        backgroundColor: theme.palette.action.selected,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }),
      ...(parentSelected && {
        backgroundColor: "rgba(46, 125, 50, 0.08)",
        color: "#2E7D32",
        fontWeight: 600,
        "&:hover": {
          backgroundColor: "rgba(46, 125, 50, 0.12)",
        },
        "& .MuiListItemText-primary": {
          color: "#2E7D32 !important",
          fontWeight: "600 !important",
        },
        "& .MuiListItemText-root": {
          color: "#2E7D32",
        },
      }),
    }),
  }),

  // 图标样式 Icon styles
  "& .MuiListItemIcon-root": {
    minWidth: 24,
    marginRight: theme.spacing(1.5),
  },
  // 次文本样式 Secondary text styles
  "& .MuiListItemText-secondary": {
    fontSize: "12px",
    color: (selected || parentSelected) ? "#2E7D32" : "",
  },
}));

/**
 * 样式化的列表项文本组件
 * Styled list item text component
 * 
 * 定义菜单项文本的布局和样式，包括主文本和次文本
 * Defines layout and styles for menu item text, including primary and secondary text
 */
const StyledListItemText = styled(ListItemText)({
  // 布局样式 Layout styles
  flex: "1 1 auto",
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  maxHeight: 40,
  padding: "0 8px 0 0",
  margin: 0,

  // 次文本样式 Secondary text styles
  "& .MuiListItemText-secondary": {
    fontSize: "12px",
    lineHeight: 0
  },

  // 主文本样式 Primary text styles
  "& .MuiListItemText-primary": {
    fontSize: "14px",
    fontWeight: "inherit", // 继承父级的字重设置
    color: "inherit", // 继承父级的颜色设置
  }
});

/**
 * 箭头图标组件
 * Arrow icon component
 * 
 * 用于显示菜单项的展开/折叠状态，带有旋转动画效果
 * Used to display expand/collapse state of menu items with rotation animation
 * 
 * @param open - 是否展开 Whether expanded
 * @param className - 额外的CSS类名 Additional CSS class name
 * @param props - 其他属性 Other props
 */
const ArrowIcon = ({
  open,
  className,
  ...props
}: {
  /** 是否展开 Whether expanded */
  open: boolean;
  /** CSS类名 CSS class name */
  className?: string;
  /** MUI样式属性 MUI style props */
  sx?: SxProps<Theme>;
}) => {
  return (
    <Iconify
      icon={"eva:arrow-ios-downward-fill"}
      className={`transition-all duration-300 ease-in-out ${open ? "rotate-0" : "rotate-[-90deg]"
        } ${className}`}
      sx={{ color: "#757575" }}
      {...props}
    />
  );
};

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
        {hasSubItems && <ArrowIcon open={open} />}
      </Box>
    </StyledListItemButton>
  );
};
