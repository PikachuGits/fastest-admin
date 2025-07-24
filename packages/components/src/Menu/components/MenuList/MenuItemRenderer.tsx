/**
 * 菜单项渲染组件
 * Menu item renderer component
 */

import React, { type ReactElement } from 'react';
import { Collapse, List, styled } from '@mui/material';
import { MenuItem } from '../MenuItem';
import type { NavItem, OpenStatesRecord } from './types';
import { parseInfoBadge, getBadgeColor, hasChildren } from './utils';

/**
 * 容器样式组件
 * Container styled component
 */
const ContainerBox = styled('div')(({ theme }) => ({}));

/**
 * MenuItemRenderer 组件属性接口
 * MenuItemRenderer component props interface
 */
export interface MenuItemRendererProps {
  /** 菜单项数据 */
  item: NavItem;
  /** 菜单项路径 */
  itemPath: string;
  /** 菜单层级 */
  level: number;
  /** 当前选中的菜单项路径 */
  selectedItem: string;
  /** 菜单项展开状态记录 */
  openStates: OpenStatesRecord;
  /** 切换展开状态的回调函数 */
  onToggleOpen: (key: string) => void;
  /** 菜单项点击回调函数 */
  onItemClick: (itemKey: string) => void;
}

/**
 * 菜单项渲染组件
 * Menu item renderer component
 * 
 * 负责渲染单个菜单项及其子菜单项，支持多层级嵌套
 * Responsible for rendering individual menu items and their sub-items, supports multi-level nesting
 * 
 * @param props - 组件属性
 * @returns 渲染的菜单项元素
 */
export const MenuItemRenderer: React.FC<MenuItemRendererProps> = ({
  item,
  itemPath,
  level = 0,
  selectedItem,
  openStates,
  onToggleOpen,
  onItemClick,
}) => {
  // 检查当前菜单项是否被选中
  const isSelected = selectedItem === itemPath;
  
  // 检查当前菜单项是否展开
  const isOpen = openStates[itemPath] || false;
  
  // 检查是否有子菜单项
  const hasSubItems = hasChildren(item);
  
  // 解析徽章数字
  const badge = parseInfoBadge(item.info);
  
  // 获取图标（如果存在）
  const actualIcon = item.icon ? item.icon : undefined;

  /**
   * 递归渲染子菜单项
   * Recursively render sub-menu items
   */
  const renderSubItems = () => {
    if (!hasSubItems || !item.children) return null;

    return (
      <Collapse
        in={isOpen}
        timeout="auto"
        unmountOnExit
        data-level={level === 0 ? "false" : "true"}
        sx={{
          paddingLeft: "24px",
        }}
      >
        <List
          component="div"
          disablePadding
          sx={{ paddingLeft: "12px" }}
          className="fast-menu-item-container-sub"
        >
          {item.children.map((child, childIndex) => (
            <MenuItemRenderer
              key={`${itemPath}.${childIndex}`}
              item={child}
              itemPath={`${itemPath}.${childIndex}`}
              level={level + 1}
              selectedItem={selectedItem}
              openStates={openStates}
              onToggleOpen={onToggleOpen}
              onItemClick={onItemClick}
            />
          ))}
        </List>
      </Collapse>
    );
  };

  return (
    <ContainerBox
      key={itemPath}
      sx={
        level === 0
          ? {
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)", // Safari 兼容
              marginTop: 1,
              borderRadius: 1,
              transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: "10000 !important",
              boxShadow: "rgba(0, 0, 0, 0.35) 1px 2px 5px",
              padding: "2px 2px",
            }
          : {}
      }
    >
      {/* 主菜单项 */}
      <MenuItem
        icon={actualIcon as any}
        primary={item.title}
        secondary={item.caption}
        level={level}
        selected={isSelected}
        hasSubItems={hasSubItems}
        open={isOpen}
        onToggle={hasSubItems ? () => onToggleOpen(itemPath) : undefined}
        onClick={() => onItemClick(itemPath)}
        numberBadge={badge}
        badgeColor={getBadgeColor(badge)}
        disabled={false}
      />
      
      {/* 子菜单项 */}
      {renderSubItems()}
    </ContainerBox>
  );
};