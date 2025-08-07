import { use, useEffect, useMemo } from "react";
import { useMenuHelpers } from "../hooks/useMenuHelpers";
import { useMenuStore } from "../context/MenuStoreContext";
import { useStore } from "zustand";
import { List, ListItemText, styled } from "@mui/material";
import { MenuBaseListSx } from "../styles/menu.sx";
import { MenuSectionRenderer } from "./MenuSectionRenderer";
import type { InternalMenuItem, MenuData } from "../types";
import {
  normalizeMenuData,
  convertNavSectionsToMenuItems,
} from "../utils/convert";

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

    // 标准化数据：支持新的 NavSection[]、NavData 格式和旧的数组格式
    // Normalize data: support new NavSection[], NavData format and legacy array format
    const normalizedSections: InternalMenuItem[] = (() => {
      // 如果是旧格式的 InternalMenuItem[] 数组，直接返回
      if (
        Array.isArray(menuData) &&
        menuData.length > 0 &&
        menuData[0] &&
        "key" in menuData[0]
      ) {
        return menuData as InternalMenuItem[];
      }

      // 否则标准化为 NavSection[]，然后转换为 InternalMenuItem[]
      const sections = normalizeMenuData(menuData!);
      return convertNavSectionsToMenuItems(sections);
    })();

    return normalizedSections?.map(
      (section: InternalMenuItem, index: number) => {
        if (!section) return null; // 空值检查 Null check
        console.log(section, "section");
        return (
          <MenuSectionRenderer
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
        ...MenuBaseListSx,
        ...props.style,
      }}
      className={props.className}
    >
      {renderMenuSections}
    </List>
  );
};

export default MenuList;
