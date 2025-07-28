/**
 * 菜单分组渲染组件
 * Menu section renderer component
 */

import React, { useState, type ReactElement } from 'react';
import { Collapse, List } from '@mui/material';
import { GroupHeader } from '../GroupHeader';
import { MenuItemRenderer } from './MenuItemRenderer';
import { type MenuSectionRendererProps } from './MenuSectionRenderer.styles';

/**
 * 菜单分组渲染组件
 * Menu section renderer component
 * 
 * 负责渲染菜单分组，包括分组标题和分组内的菜单项
 * Responsible for rendering menu sections, including section headers and menu items within sections
 * 
 * @param props - 组件属性
 * @returns 渲染的菜单分组元素
 */
export const MenuSectionRenderer: React.FC<MenuSectionRendererProps> = ({
  section,
  sectionIndex,
  selectedItem,
  openStates,
  onToggleOpen,
  onItemClick,
}) => {
  // 分组标题的展开状态（独立于菜单项的展开状态）
  const [isSubheaderOpen, setIsSubheaderOpen] = useState(true);

  /**
   * 处理分组标题点击事件
   * Handle section header click event
   */
  const handleSubheaderClick = () => {
    console.log('Section header clicked:', section.subheader, 'Current state:', isSubheaderOpen);
    setIsSubheaderOpen(!isSubheaderOpen);
  };

  /**
   * 渲染分组内的菜单项
   * Render menu items within the section
   */
  const renderSectionItems = () => {
    return (
      <List sx={{ padding: 0 }}>
        {section.items.map((item, itemIndex) => (
          <MenuItemRenderer
            key={`section-${sectionIndex}.${itemIndex}`}
            item={item}
            itemPath={`section-${sectionIndex}.${itemIndex}`}
            level={0}
            selectedItem={selectedItem}
            openStates={openStates}
            onToggleOpen={onToggleOpen}
            onItemClick={onItemClick}
          />
        ))}
      </List>
    );
  };

  return (
    <div key={`section-${sectionIndex}`}>
      {/* 分组标题（如果存在） */}
      {section.subheader && (
        <GroupHeader
          open={isSubheaderOpen}
          title={section.subheader}
          onClick={handleSubheaderClick}
        />
      )}
      {/* 分组内容（可折叠） */}
      <Collapse sx={{ px: 0.5 }} in={isSubheaderOpen} timeout="auto" unmountOnExit>
        {renderSectionItems()}
      </Collapse>
    </div>
  );
};