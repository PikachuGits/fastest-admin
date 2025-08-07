/**
 * 菜单分组渲染组件
 * Menu section renderer component
 *
 * 使用 Zustand 进行状态管理的菜单分组渲染组件
 * Menu section renderer component using Zustand for state management
 */

import React, { useState } from "react";
import { Collapse, List } from "@mui/material";
import { GroupHeader } from "../GroupHeader";
import { MenuItemRenderer } from "./MenuItemRenderer";
import { useMenuStoreContext } from "../../../context/MenuStoreContext";
import type { NavSection } from "../../../types";

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuSectionRenderer 组件属性接口（简化版）
 * MenuSectionRenderer component props interface (simplified)
 */
interface MenuSectionRendererProps {
  section: NavSection;
  sectionIndex: number;
}

/**
 * 菜单分组渲染组件
 * Menu section renderer component
 *
 * 使用 Zustand 进行状态管理的菜单分组渲染组件
 * Menu section renderer component using Zustand for state management
 *
 * @param props - 简化的组件属性 Simplified component props
 * @returns 渲染的菜单分组元素 Rendered menu section element
 */
export const MenuSectionRenderer: React.FC<MenuSectionRendererProps> = ({
  section,
  sectionIndex,
}) => {
  // ==================== 状态管理 State Management ====================

  /**
   * 从 Context 获取当前实例的 store
   * Get current instance store from Context
   */
  const store = useMenuStoreContext();
  const collapsed = store((state) => state.collapsed);
  /**
   * 分组标题的展开状态（独立于菜单项的展开状态）
   * Section header open state (independent of menu item open states)
   */
  const [isSubheaderOpen, setIsSubheaderOpen] = useState(true);

  /**
   * 处理分组标题点击事件
   * Handle section header click event
   */
  const handleSubheaderClick = () => {
    // Section header clicked - toggle subheader state
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
          />
        ))}
      </List>
    );
  };

  return (
    <div key={`section-${sectionIndex}`}>
      {/* 分组标题（如果存在） */}
      {section.subheader && (
        <Collapse in={!collapsed} timeout="auto" unmountOnExit>
          <GroupHeader
            open={isSubheaderOpen}
            title={section.subheader}
            onClick={handleSubheaderClick}
          />
        </Collapse>
      )}
      {/* 分组内容（可折叠） */}
      <Collapse
        sx={{ px: 0.5 }}
        in={collapsed ? true : isSubheaderOpen}
        timeout="auto"
        unmountOnExit
      >
        {renderSectionItems()}
      </Collapse>
    </div>
  );
};
