import {
  styled,
  ListItemButton,
  ListItemText,
  type SxProps,
  type Theme,
} from "@mui/material";
import { Iconify } from "@fastest/components";
import { createMenuTheme } from "./theme";
// import { type NumberChipColor } from "../components/private/NumberChip";
// import { createMenuTheme } from "../styles/theme";
// import type { NavItem, MenuItemState, OpenStatesRecord } from '../types';

// ==================== 类型定义 Type Definitions ====================

// /**
//  * MenuItem 组件属性接口（精简版）
//  * MenuItem component props interface (simplified)
//  *
//  * 精简props传递，移除冗余状态，统一使用状态管理
//  * Simplified props passing, removed redundant states, unified state management
//  */
// export interface MenuItemProps {
//     /** 菜单项数据 Menu item data */
//     item: NavItem;
//     /** 菜单项路径 Menu item path */
//     itemPath: string;
//     /** 当前选中项路径 Currently selected item path */
//     selectedItem: string;
//     /** 菜单层级深度 Menu nesting level depth */
//     level?: number;
//     /** 是否展开（仅当有子项时有效） Whether expanded (only valid when has sub-items) */
//     open?: boolean;
//     /** 是否收起状态 Whether in collapsed state */
//     collapsed?: boolean;
//     /** 展开/折叠切换回调函数 Toggle expand/collapse callback function */
//     onToggle?: () => void;
//     /** 点击回调函数 Click callback function */
//     onClick?: () => void;
//     /** 是否禁用 Whether disabled */
//     disabled?: boolean;
//     /** 自定义样式 Custom styles */
//     sx?: SxProps<Theme>;
// }

// // ==================== 样式组件 Styled Components ====================

// /**
//  * 样式化的列表项按钮组件
//  * Styled list item button component
//  *
//  * 提供菜单项的基础样式，包括选中状态、层级缩进等
//  * Provides basic styles for menu items, including selected state, level indentation, etc.
//  */
// export const StyledListItemButton = styled(ListItemButton, {
//     shouldForwardProp: (prop) => !['level', 'selected', 'hasSubItems', 'parentSelected', "collapsed"].includes(prop as string),
// })<{
//     level?: number;
//     selected?: boolean;
//     hasSubItems?: boolean;
//     parentSelected?: boolean;
//     collapsed?: boolean;
// }>(({ theme, level = 0, selected, hasSubItems, parentSelected, collapsed }) => {
//     const menuTheme = createMenuTheme(theme);
//     const { colors, spacing, animations, breakpoints, utils } = menuTheme;
//     const levelStyles = utils.getLevelStyles(level);

//     return {
//         // 基础布局样式 Basic layout styles
//         // marginTop: level ? theme.spacing(0.5) : 0,
//         padding: spacing.padding.item,
//         borderRadius: spacing.size.borderRadius,
//         minHeight: spacing.size.itemHeight,
//         overflow: 'visible',

//         // 过渡动画 Transition animations
//         ...utils.createTransition(['background-color', 'color']),

//         // 容器查询：收起状态样式 Container query: collapsed state styles
//         ...utils.createContainerQuery(breakpoints.container.collapsed, {
//             "& .MuiListItemText-root": {
//                 fontSize: "12px",
//                 transform: animations.transform.scale,
//                 padding: 0,
//             },
//             "& .MuiListItemIcon-root": {
//                 marginRight: 0,
//             },
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'column',
//             padding: spacing.padding.itemCollapsed,
//             minHeight: 0
//         }),

//         // 选中状态样式 Selected state styles
//         ...((selected || parentSelected) && {
//             // 一级菜单项（level=0）使用主题色
//             ...(level === 0 && {
//                 backgroundColor: colors.background.selected,

//                 color: colors.text.selected,
//                 fontWeight: levelStyles.fontWeight,
//                 "&:hover": {
//                     backgroundColor: colors.background.focus,
//                 },
//                 "& .MuiListItemText-primary": {
//                     color: `${colors.text.selected} !important`,
//                     fontWeight: `${levelStyles.fontWeight} !important`,
//                 },
//                 "& .MuiListItemText-root": {
//                     color: colors.text.selected,
//                 },
//             }),
//             // 二级及以下菜单项样式
//             ...(level > 0 && {
//                 ...(selected && {
//                     backgroundColor: theme.palette.action.selected,
//                     "&:hover": {
//                         backgroundColor: theme.palette.action.hover,
//                     },
//                 }),
//                 ...(parentSelected && {
//                     backgroundColor: colors.primary.light,
//                     color: colors.primary.main,
//                     fontWeight: 600,
//                     "&:hover": {
//                         backgroundColor: colors.background.focus,
//                     },
//                     "& .MuiListItemText-primary": {
//                         color: `${colors.primary.main} !important`,
//                         fontWeight: "600 !important",
//                     },
//                     "& .MuiListItemText-root": {
//                         color: colors.primary.main,
//                     },
//                 }),
//             }),
//         }),

//         // 图标样式 Icon styles
//         "& .MuiListItemIcon-root": {
//             minWidth: spacing.size.iconSize,
//             marginRight: theme.spacing(1.5),
//             ...utils.createContainerQuery(breakpoints.container.collapsed, {
//                 marginRight: 0,
//             }),
//         },

//         // 次文本样式 Secondary text styles
//         "& .MuiListItemText-secondary": {
//             fontSize: "12px",
//             color: (selected || parentSelected) ? colors.text.selected : colors.text.secondary,
//         },
//     };
// });

/**
 * 样式化的列表项文本组件
 * Styled list item text component
 *
 * 定义菜单项文本的布局和样式，包括主文本和次文本
 * Defines layout and styles for menu item text, including primary and secondary text
 */
export const StyledListItemText = styled(ListItemText)(({ theme }) => {
  const menuTheme = createMenuTheme(theme);
  const { spacing, colors } = menuTheme;

  return {
    // 布局样式 Layout styles
    flex: "1 1 auto",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    maxHeight: spacing.size.itemHeightCompact,
    padding: "0 8px 0 4px",
    margin: 0,

    // 次文本样式 Secondary text styles
    "& .MuiListItemText-secondary": {
      fontSize: "12px",
      lineHeight: 0,
    },

    // 主文本样式 Primary text styles
    "& .MuiListItemText-primary": {
      fontSize: "14px",
      fontWeight: "inherit", // 继承父级的字重设置
    },
  };
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
})<{ open: boolean }>(({ theme, open }) => {
  const menuTheme = createMenuTheme(theme);
  const { spacing, colors, animations, utils } = menuTheme;

  return {
    fontSize: spacing.size.arrowSize,
    color: colors.icon.arrow,
    ...utils.createTransition(["transform"]),
    transform: open
      ? animations.transform.arrowExpanded
      : animations.transform.arrowCollapsed,
  };
});
