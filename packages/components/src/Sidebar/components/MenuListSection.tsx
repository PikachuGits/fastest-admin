import React from "react";
import { useStore } from "zustand";
import type { InternalMenuItem } from "../types";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useMenuStore } from "../context/MenuStoreContext";
import { GroupHeader } from "./GroupHeader";

interface MenuSectionRendererProps {
  section: InternalMenuItem;
  sectionIndex: number;
  menuId: string;
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
export const MenuListSection: React.FC<MenuSectionRendererProps> = ({
  section,
  sectionIndex,
  menuId,
}) => {
  const store = useMenuStore(menuId);
  // ✅ 修复：使用响应式订阅而不是 getState()
  const collapsible = useStore(store, (state) => state.collapsible);
  const expandedItems = useStore(store, (state) => state.expandedItems);
  const toggleItem = useStore(store, (state) => state.toggleItem);
  const selectItem = useStore(store, (state) => state.selectItem);

  // 检查当前分组是否展开
  const isExpanded = expandedItems.includes(section.key);

  // 递归渲染单个菜单项（参考 MenuItemRenderer.tsx 的递归/Collapse 结构）
  const renderMenuItem = (item: InternalMenuItem, level: number) => {
    const hasChildren =
      Array.isArray(item.children) && item.children.length > 0;
    const itemExpanded = expandedItems.includes(item.key);

    const handleClick = () => {
      if (hasChildren) {
        toggleItem(item.key);
      } else {
        selectItem(item.key);
      }
    };

    return (
      <React.Fragment key={item.key}>
        <ListItemButton
          onClick={handleClick}
          disabled={item.disabled}
          sx={{ pl: (theme) => theme.spacing(2 + level * 2) }}
        >
          {/* 这里简化图标显示为纯文本占位，避免引入额外依赖 */}
          <ListItemText
            primary={
              <span>
                {item.icon && (
                  <span style={{ marginRight: 8 }}>{item.icon}</span>
                )}
                {item.title}
                {item.badge !== undefined && (
                  <span
                    style={{
                      marginLeft: 8,
                      backgroundColor: "#f0f0f0",
                      padding: "2px 6px",
                      borderRadius: 4,
                      fontSize: 12,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </span>
            }
          />
        </ListItemButton>

        {hasChildren && (
          <Collapse in={itemExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) =>
                renderMenuItem(child as InternalMenuItem, level + 1)
              )}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  // 渲染分组内的所有第一层菜单项
  const renderSectionItems = () => {
    if (!section.children || section.children.length === 0) return null;
    return (
      <List component="div" disablePadding>
        {section.children.map((child) =>
          renderMenuItem(child as InternalMenuItem, 0)
        )}
      </List>
    );
  };

  return (
    <div key={`section-${sectionIndex}`}>
      {/* 分组标题（如果存在） */}
      {section?.subheader && (
        <Collapse in={!collapsible} timeout="auto" unmountOnExit>
          <GroupHeader
            open={isExpanded}
            title={section?.subheader || ""}
            onClick={() => toggleItem(section.key)}
          />
        </Collapse>
      )}

      {/* 分组标题 */}
      <ListItemButton
        onClick={() => toggleItem(section.key)}
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <ListItemText
          primaryTypographyProps={{ fontWeight: "bold" }}
          primary={section.title}
        />
      </ListItemButton>

      {/* 分组内容 */}
      <Collapse
        sx={{ px: 0.5 }}
        in={!collapsible || isExpanded}
        timeout="auto"
        unmountOnExit
      >
        {renderSectionItems()}
      </Collapse>
    </div>
  );
};
