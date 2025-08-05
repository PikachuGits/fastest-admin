import { styled, List, type SxProps, type Theme } from '@mui/material';
import type { NavData } from '../../../types';
import { menuTheme } from '../../../styles/theme';

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuList 组件属性接口
 * MenuList component props interface
 */
export interface MenuListProps {
  /** 菜单数据 Menu data */
  data?: NavData;
  /** 菜单配置 Menu configuration */
  config?: any;
  /** 菜单项点击回调函数 Menu item click callback function */
  onItemClick?: (itemKey: string, item: any) => void;
  /** 菜单项展开/折叠回调函数 Menu item toggle callback function */
  onItemToggle?: (path: string, isOpen: boolean) => void;
  /** 是否收起状态 Whether in collapsed state */
  collapsed?: boolean;
  /** 自定义样式 Custom styles */
  style?: React.CSSProperties;
  /** CSS 类名 CSS class name */
  className?: string;
  /** MUI 样式属性 MUI style props */
  sx?: SxProps<Theme>;
}

// ==================== 样式组件 Styled Components ====================

/**
 * 主列表容器样式
 * Main list container styles
 * 
 * 定义菜单列表的基础样式和布局
 * Defines basic styles and layout for the menu list
 */
export const StyledListBox = styled(List)(({ theme }) => {
  const { spacing, colors } = menuTheme;
  
  return {
    width: '100%',
    maxWidth: spacing.width.default,
    backgroundColor: colors.background.paper,
    padding: 0,
    
    // 容器查询支持 Container query support
    containerType: 'inline-size',
    containerName: 'sidebar',
  };
});