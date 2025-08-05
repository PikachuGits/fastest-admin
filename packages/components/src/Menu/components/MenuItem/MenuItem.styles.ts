import {
    styled,
    ListItemButton,
    ListItemText,
    type SxProps,
    type Theme,
    containerClasses,
} from "@mui/material";
import { Iconify } from "@fastest/components";
import { type NumberChipColor } from "../NumberChip";
import { transform } from "typescript";

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
    /** 是否收起状态 Whether in collapsed state */
    collapsed?: boolean;
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
    /** 自定义样式 Custom styles */
    sx?: SxProps<Theme>;
}

// ==================== 样式组件 Styled Components ====================

/**
 * 样式化的列表项按钮组件
 * Styled list item button component
 * 
 * 提供菜单项的基础样式，包括选中状态、层级缩进等
 * Provides basic styles for menu items, including selected state, level indentation, etc.
 */
export const StyledListItemButton = styled(ListItemButton, {
    shouldForwardProp: (prop) => !['level', 'selected', 'hasSubItems', 'parentSelected', "collapsed"].includes(prop as string),
})<{
    level?: number;
    selected?: boolean;
    hasSubItems?: boolean;
    parentSelected?: boolean;
    collapsed?: boolean;
}>(({ theme, level = 0, selected, hasSubItems, parentSelected, collapsed }) => ({
    // 基础布局样式 Basic layout styles
    marginTop: level ? theme.spacing(0.5) : 0,
    padding: " 4px 8px 4px 12px",
    borderRadius: theme.spacing(1),
    minHeight: 44,
    // 设置容器查询上下文
    overflow: 'visible', // 默认值
    // 容器查询：当元素自身宽度小于100px时
    '@container sidebar (max-width: 100px)': {
        "& .MuiListItemText-root": {
            fontSize: "12px",
            transform: 'scale(0.7)',
            padding: 0,
        },
        "& .MuiListItemIcon-root": {
            marginRight: 0,
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(0.5, 0.5, 0, 0.5),
        minHeight: 0
    },
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
        '@container sidebar (max-width: 100px)': {
            marginRight: 0,
        },
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
export const StyledListItemText = styled(ListItemText)({
    // 布局样式 Layout styles
    flex: "1 1 auto",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    maxHeight: 40,
    padding: "0 8px 0 4px",
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
 * 样式化的箭头图标组件
 * Styled arrow icon component
 * 
 * 用于显示菜单项的展开/折叠状态，带有旋转动画效果
 * Used to display expand/collapse state of menu items with rotation animation
 */
export const StyledArrowIcon = styled(Iconify, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
    fontSize: 18,
    color: theme.palette.grey[500],
    transition: "all 0.3s ease",
    transform: open ? "rotate(0deg)" : "rotate(-90deg)",
}));