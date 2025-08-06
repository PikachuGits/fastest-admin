import { type SxProps, type Theme } from '@mui/material';
import type { NavSection, OpenStatesRecord } from '../../../types';

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuSectionRenderer 组件属性接口
 * MenuSectionRenderer component props interface
 */
export interface MenuSectionRendererProps {
  /** 菜单分组数据 Menu section data */
  section: NavSection;
  /** 分组索引 Section index */
  sectionIndex: number;
  /** 当前选中的菜单项路径 Currently selected menu item path */
  selectedItem: string;
  /** 菜单项展开状态记录 Menu item open states record */
  openStates: OpenStatesRecord;
  /** 切换展开状态的回调函数 Callback function to toggle open state */
  onToggleOpen: (key: string) => void;
  /** 菜单项点击回调函数 Menu item click callback function */
  onItemClick: (itemKey: string) => void;
  /** 是否收起状态 Whether in collapsed state */
  collapsed?: boolean;
  /** 自定义样式 Custom styles */
  sx?: SxProps<Theme>;
}