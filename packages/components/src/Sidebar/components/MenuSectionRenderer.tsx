import { useStore } from "zustand";
import type { InternalMenuItem } from "../types";
import { Collapse } from "@mui/material";
import { useMenuStore } from "../context/MenuStoreContext";

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
export const MenuSectionRenderer: React.FC<MenuSectionRendererProps> = ({
  section,
  sectionIndex,
  menuId,
}) => {
  const store = useMenuStore(menuId);
  // ✅ 修复：使用响应式订阅而不是 getState()
  const collapsible = useStore(store, (state) => state.collapsible);
  const expandedItems = useStore(store, (state) => state.expandedItems);

  // 检查当前分组是否展开
  const isExpanded = expandedItems.includes(section.key);

  // 渲染子菜单项
  const renderSectionItems = () => {
    if (!section.children || section.children.length === 0) {
      return null;
    }

    return section.children.map((item, index) => {
      // 确保 item 是 InternalMenuItem 类型
      const internalItem = item as InternalMenuItem;

      return (
        <div key={`${section.key}-item-${index}`}>
          {/* 这里应该渲染菜单项，暂时用简单的 div */}
          <div style={{ padding: "8px 16px", cursor: "pointer" }}>
            {internalItem.icon && (
              <span style={{ marginRight: "8px" }}>{internalItem.icon}</span>
            )}
            {internalItem.title}
            {internalItem.badge && (
              <span
                style={{
                  marginLeft: "8px",
                  backgroundColor: "#f0f0f0",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                {internalItem.badge}
              </span>
            )}
          </div>
          {/* 递归渲染子菜单 */}
          {internalItem.children && internalItem.children.length > 0 && (
            <div style={{ marginLeft: "16px" }}>
              {internalItem.children.map((childItem, childIndex) => {
                const internalChildItem = childItem as InternalMenuItem;
                return (
                  <div
                    key={`${internalItem.key}-child-${childIndex}`}
                    style={{
                      padding: "4px 16px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    {internalChildItem.icon && (
                      <span style={{ marginRight: "8px" }}>
                        {internalChildItem.icon}
                      </span>
                    )}
                    {internalChildItem.title}
                    {internalChildItem.badge && (
                      <span
                        style={{
                          marginLeft: "8px",
                          backgroundColor: "#f0f0f0",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontSize: "10px",
                        }}
                      >
                        {internalChildItem.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div key={`section-${sectionIndex}`}>
      {/* 分组标题 */}
      <div
        style={{
          padding: "12px 16px",
          backgroundColor: "#f5f5f5",
          fontWeight: "bold",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {section.title}
      </div>

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
