/**
 * MenuList 主组件
 * Main MenuList component
 * 
 * 这是一个重构后的菜单列表组件，采用模块化设计：
 * - 类型定义独立到 types.ts
 * - 工具函数独立到 utils.ts  
 * - 状态管理独立到 useMenuState.ts
 * - 渲染逻辑拆分到 MenuItemRenderer 和 MenuSectionRenderer
 * 
 * This is a refactored menu list component with modular design:
 * - Type definitions separated to types.ts
 * - Utility functions separated to utils.ts
 * - State management separated to useMenuState.ts
 * - Rendering logic split into MenuItemRenderer and MenuSectionRenderer
 */

import React from 'react';
import { List, styled } from '@mui/material';
import menuData from '../../data/menu-data.json';
import '../../styles/index.less';

// 导入拆分的模块
import type { NavData, MenuListProps } from './types';
import { useMenuState } from './useMenuState';
import { MenuSectionRenderer } from './MenuSectionRenderer';

/**
 * 主列表容器样式
 * Main list container styles
 */
const ListBox = styled(List)(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
  padding: 0,
}));

/**
 * MenuList 主组件
 * Main MenuList component
 * 
 * @param props - 传递给 List 组件的属性
 * @returns 渲染的菜单列表
 */
const MenuList: React.FC<MenuListProps> = (props) => {
  // 使用自定义 Hook 管理菜单状态
  const { openStates, selectedItem, toggleOpen, handleItemClick } = useMenuState(
    menuData as NavData
  );

  /**
   * 渲染菜单分组
   * Render menu sections
   */
  const renderMenuSections = () => {
    return (menuData as NavData).navItems.map((section, index) => {
      console.log('Rendering section:', section);
      return (
        <MenuSectionRenderer
          key={`section-${index}`}
          section={section}
          sectionIndex={index}
          selectedItem={selectedItem}
          openStates={openStates}
          onToggleOpen={toggleOpen}
          onItemClick={handleItemClick}
        />
      );
    });
  };

  return (
    <ListBox
      {...props}
      sx={{
        height: '100%',
        pb: (theme) => theme.spacing(2),
      }}
    >
      {renderMenuSections()}
    </ListBox>
  );
};
export default MenuList;