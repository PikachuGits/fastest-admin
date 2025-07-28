import { styled, List, type SxProps, type Theme } from '@mui/material';
import type { NavItem, OpenStatesRecord } from '../../types';

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
export const StyledContainerBox = styled('div')(({ theme }) => ({}));

export const StyledContainerBoxLevelSx: SxProps<Theme> = ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  marginTop: (theme) => theme.spacing(1),
  borderRadius: 1,
  transition: (theme) =>
    theme.transitions.create("all", {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
  zIndex: (theme) => theme.zIndex.appBar + 10,
  boxShadow: (theme) => theme.shadows[3],
  padding: (theme) => theme.spacing(0.5),
});
/**
 * 子菜单容器样式
 * Sub-menu container styles
 * 
 * 为子菜单项提供适当的缩进和间距
 * Provides appropriate indentation and spacing for sub-menu items
 */
export const StyledSubMenuList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingTop: 0,
  paddingBottom: 0,
}));

