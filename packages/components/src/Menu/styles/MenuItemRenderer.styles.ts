import { styled, List, type SxProps, type Theme } from '@mui/material';
import type { NavItem, OpenStatesRecord } from '../types';

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuItemRenderer 组件属性接口
 * MenuItemRenderer component props interface
 * 
 * 定义菜单项渲染器的所有必需和可选属性
 * Defines all required and optional properties for the menu item renderer
 */
export interface MenuItemRendererProps {
  /** 菜单项数据 Menu item data */
  item: NavItem;
  /** 菜单项路径 Menu item path */
  itemPath: string;
  /** 菜单层级深度 Menu nesting level depth */
  level: number;
  /** 当前选中的菜单项路径 Currently selected menu item path */
  selectedItem: string;
  /** 菜单项展开状态记录 Menu item open states record */
  openStates: OpenStatesRecord;
  /** 切换展开状态的回调函数 Callback function to toggle open state */
  onToggleOpen: (key: string) => void;
  /** 菜单项点击回调函数 Menu item click callback function */
  onItemClick: (itemKey: string) => void;
  /** 菜单收起状态 Menu collapsed state */
  collapsed?: boolean;
  /** 自定义样式 Custom styles */
  sx?: SxProps<Theme>;
}

// ==================== 样式组件 Styled Components ====================
/**
 * 容器样式组件
 * Container styled component
 * 
 * 为菜单项提供基础容器样式，支持多层级嵌套
 * Provides basic container styles for menu items, supporting multi-level nesting
 */
export const StyledContainerBox = styled('div')(({ theme }) => {
  return {
    // 基础样式 Basic styles
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: 8, // 使用固定值而不是从 spacing 中获取
    marginBottom: theme.spacing(0.5),
    // 动画效果 Animation effects
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
    // 层级和阴影 Z-index and shadow
    zIndex: theme.zIndex.appBar + 10,
    // 容器查询支持 Container query support
    containerType: 'inline-size',
    containerName: 'sidebar',
    // border: '1px solid red',
  };
});

export const StyledContainerBoxLevelSx: SxProps<Theme> = {
  // 这个样式对象已经被上面的styled组件替代
  // This style object has been replaced by the styled component above
    background: (theme) => theme.palette.background.default, // 使用固定颜色值
     // 容器查询支持 Container query support
    containerType: 'inline-size',
    boxShadow: (theme) => theme.shadows[3],
    padding: (theme) => theme.spacing(0.5),
    marginBottom: (theme) => theme.spacing(1),
};
/**
 * 子菜单容器样式
 * Sub-menu container styles
 * 
 * 为子菜单项提供适当的缩进和间距
 * Provides appropriate indentation and spacing for sub-menu items
 */
export const StyledSubMenuList = styled(List)(({ theme }) => {
  return {
    paddingLeft: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: 0,

    // 继承容器查询上下文 Inherit container query context
    containerType: 'inherit',
  };
});

