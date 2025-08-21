import { use, useEffect, useMemo } from "react";
import { useMenuHelpers } from "../hooks/useMenuHelpers";
import { useMenuStore } from "../context/MenuStoreContext";
import { useStore } from "zustand";
import { List, ListItemText, styled } from "@mui/material";
import { MenuBaseLayerListSx } from "../styles/menu.sx";
import { MenuListSection } from "./MenuListSection";
import type { InternalMenuItem } from "../types";
import {
  normalizeMenuData,
  convertNavSectionsToMenuItems,
} from "../utils/convert";

/**
 * 菜单列表组件
 * Menu list component
 *
 * 菜单列表组件，用于渲染菜单数据。
 * Menu list component, used to render menu data.
 *
 * 这个组件是菜单系统的核心组件之一，负责将菜单数据渲染为可交互的列表。
 * 它使用 Zustand 管理菜单状态，并根据菜单数据动态生成菜单项。
 */
const MenuList = (props: any) => {
  const store = useMenuStore(props.menuId);
  // ✅ 修复：使用响应式订阅而不是 getState()
  const collapsible = useStore(store, (state) => state.collapsible);
  const menuData = useStore(store, (state) => state.data);

  // 或者使用修复后的 useMenuHelpers
  // const { collapsible } = useMenuHelpers(props.menuId);

  useEffect(() => {
    console.log(collapsible, "MenuList - collapsible 状态变化");
  }, [collapsible]); // ✅ 修复：依赖 collapsible 值而不是 store

  // ==================== 渲染函数 Render Functions ====================

  /**
   * 渲染菜单分组
   * Render menu sections
   *
   * 遍历菜单数据并渲染每个分组
   * Iterates through menu data and renders each section
   */

  const renderMenuSections = useMemo(() => {
    // 添加空值检查，确保 menuData 存在
    // Add null check to ensure menuData exists
    if (!menuData) {
      return null;
    }

    // 仅支持 NavSection[]：标准化后转换为 InternalMenuItem[]
    const sections = normalizeMenuData(menuData);
    const normalizedSections: InternalMenuItem[] =
      convertNavSectionsToMenuItems(sections);

    return normalizedSections.map(
      (section: InternalMenuItem, index: number) => {
        if (!section) return null; // 空值检查 Null check
        return (
          <MenuListSection
            key={`section-${index}`}
            section={section}
            sectionIndex={index}
            menuId={props.menuId}
          />
        );
      }
    );
  }, [menuData]);

  // ==================== 组件渲染 Component Render ====================
  return (
    <List
      sx={{
        ...MenuBaseLayerListSx,
        ...props.style,
      }}
      className={props.className}
    >
      {renderMenuSections}
    </List>
  );
};

export default MenuList;
