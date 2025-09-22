import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
    Box,
    List,
} from "@mui/material";
import {
    MenuBoxSx,
    MenuItemSx,
    MenuSubBoxSx,
} from "@components/Sidebar/styles/Menu.sx";
import {
    SubHeader,
    MenuItemGroup,
    MenuItemBox,
    MenuItem,
    MenuFloating,
} from "../index";
import menuData from "@components/Sidebar/data";
import { sxStyled } from "@components/utils/sx";
import type { MenuSection, MenuItem as MenuItemType } from "@components/Sidebar/types";
import { useMenuStore } from "@components/Sidebar/stores";
import {
    shouldMenuItemShowSelected,
    isMenuSectionContainsSelected,
} from "@components/Sidebar/utils/menuUtils";
import "@components/Sidebar/styles/global.less";

// ==================== 常量定义 Constants ====================

/** 悬浮菜单延迟时间配置 */
const HOVER_DELAYS = {
    /** 鼠标离开后关闭菜单的延迟时间(ms) */
    CLOSE_DELAY: 100,
    /** 鼠标离开菜单后关闭子菜单的延迟时间(ms) */
    SUBMENU_CLOSE_DELAY: 150,
} as const;

// ==================== 类型定义 Type Definitions ====================

/** 悬浮菜单项接口 */
interface ActiveMenu {
    /** 菜单唯一标识 */
    id: string;
    /** 锚点元素 */
    anchorEl: HTMLElement;
    /** 菜单项列表 */
    items: MenuItemType[];
    /** 菜单层级 */
    level: number;
    /** 菜单标题 */
    title?: string;
}

/** Menu组件属性接口 */
interface MenuProps {
    /** 是否收起状态 */
    collapsed?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
}

// ==================== 组件实现 Component Implementation ====================

export const Menu: React.FC<MenuProps> = React.memo(({ collapsed: propCollapsed, className, style }) => {
    const {
        expanded,
        collapsed,
        selected,
        toggleExpand,
        selectItem,
        setCollapsed,
        getExpanded,
    } = useMenuStore();

    // 悬浮菜单状态管理 - 支持多级菜单
    const [activeMenus, setActiveMenus] = useState<ActiveMenu[]>([]);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 菜单数据 - 使用useMemo优化
    const data = useMemo(() => menuData as unknown as MenuSection[], []);

    // 同步外部collapsed状态
    useEffect(() => {
        if (propCollapsed !== undefined) {
            console.log(propCollapsed, "props.collapsed");
            setCollapsed(propCollapsed);
        }
    }, [propCollapsed, setCollapsed]);

    // ==================== 事件处理函数 Event Handlers ====================

    /** 处理分组点击事件 */
    const handleSectionClick = useCallback((section: MenuSection) => {
        console.log("Section clicked:", section);
        toggleExpand(section.id.toString());
    }, [toggleExpand]);

    /** 处理菜单项点击事件 */
    const handleItemClick = useCallback((item: MenuItemType) => {
        console.log("Menu item clicked:", item);
        // 如果有子项，切换展开状态；否则选中该项
        if (item.children?.length) {
            toggleExpand(item.id.toString());
        } else {
            selectItem(item.id.toString(), data);
            // 这里可以添加路由跳转或其他业务逻辑
        }
    }, [toggleExpand, selectItem, data]);

    // ==================== 悬浮菜单事件处理 Floating Menu Handlers ====================

    /** 清除悬浮菜单延迟定时器 */
    const clearHoverTimeout = useCallback(() => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    }, []);

    /** 设置悬浮菜单延迟关闭 */
    const setHoverTimeout = useCallback((callback: () => void, delay: number) => {
        clearHoverTimeout();
        hoverTimeoutRef.current = setTimeout(callback, delay);
    }, [clearHoverTimeout]);

    /** 处理分组鼠标进入事件 */
    const handleSectionMouseEnter = useCallback((
        event: React.MouseEvent<HTMLElement>,
        section: MenuSection
    ) => {
        if (!collapsed) return; // 只在收起状态下启用悬浮菜单

        clearHoverTimeout();

        // 显示第一级菜单
        setActiveMenus([
            {
                id: section.id.toString(),
                anchorEl: event.currentTarget,
                items: section.items,
                level: 0,
                title: section.subheader,
            },
        ]);
    }, [collapsed, clearHoverTimeout]);

    /** 处理分组鼠标离开事件 */
    const handleSectionMouseLeave = useCallback(() => {
        if (!collapsed) return;

        setHoverTimeout(() => {
            setActiveMenus([]);
        }, HOVER_DELAYS.CLOSE_DELAY);
    }, [collapsed, setHoverTimeout]);

    /** 处理菜单项鼠标进入事件 */
    const handleMenuItemMouseEnter = useCallback((
        event: React.MouseEvent<HTMLElement>,
        item: MenuItemType,
        level: number
    ) => {
        clearHoverTimeout();

        // 如果有子菜单，显示下一级
        if (item.children && item.children.length > 0) {
            setActiveMenus((prev) => {
                // 保留当前级别及之前的菜单，移除之后的菜单
                const currentLevelMenus = prev.slice(0, level + 1);
                // 添加新的子菜单
                return [
                    ...currentLevelMenus,
                    {
                        id: item.id.toString(),
                        anchorEl: event.currentTarget,
                        items: item.children || [], // 确保items不为undefined
                        level: level + 1,
                        title: item.title,
                    },
                ];
            });
        } else {
            // 没有子菜单，移除后续级别的菜单
            setActiveMenus((prev) => prev.slice(0, level + 1));
        }
    }, [clearHoverTimeout]);

    /** 处理菜单鼠标离开事件 */
    const handleMenuMouseLeave = useCallback(() => {
        setHoverTimeout(() => {
            setActiveMenus([]);
        }, HOVER_DELAYS.SUBMENU_CLOSE_DELAY);
    }, [setHoverTimeout]);

    /** 处理Popper鼠标进入事件 */
    const handlePopperMouseEnter = useCallback(() => {
        clearHoverTimeout();
    }, [clearHoverTimeout]);

    /** 处理点击外部区域事件 */
    const handleClickAway = useCallback(() => {
        setActiveMenus([]);
    }, []);

    // 清理定时器
    useEffect(() => {
        return () => {
            clearHoverTimeout();
        };
    }, [clearHoverTimeout]);

    // ==================== 渲染 Render ====================

    return (
        <Box sx={sxStyled(MenuBoxSx)} className={className} style={style}>
            <List>
                {data.map((section, index) => (
                    <Box
                        sx={sxStyled(MenuSubBoxSx, {})}
                        key={section.id}
                        onMouseEnter={(e) => handleSectionMouseEnter(e, section)}
                    >
                        <Box onMouseLeave={handleSectionMouseLeave}>
                            <SubHeader
                                title={section.subheader}
                                onToggle={() => handleSectionClick(section)}
                                open={getExpanded(section.id.toString())}
                                tabIndex={index}
                                iconName={section.icon}
                                selected={isMenuSectionContainsSelected(section, selected)}
                            />
                        </Box>
                        <MenuItemBox open={getExpanded(section.id.toString())}>
                            {section.items.map((item, itemIndex) => {
                                const isExpanded = getExpanded(item.id.toString());
                                const isSelected = shouldMenuItemShowSelected(item, selected);

                                return (
                                    <Box key={item.id} sx={sxStyled(MenuItemSx, {})}>
                                        <MenuItem
                                            item={item}
                                            open={isExpanded}
                                            selected={isSelected}
                                            onClick={() => handleItemClick(item)}
                                        />
                                        {item.children && (
                                            <MenuItemGroup
                                                items={item}
                                                list={item.children}
                                                open={isExpanded}
                                                level={1}
                                                onItemClick={handleItemClick}
                                                expanded={expanded}
                                                selected={selected}
                                            />
                                        )}
                                    </Box>
                                );
                            })}
                        </MenuItemBox>
                    </Box>
                ))}
            </List>

            {/* 级联悬浮菜单 - 使用封装的 MenuFloating 组件 */}
            <MenuFloating
                collapsed={collapsed}
                activeMenus={activeMenus}
                selected={selected}
                onPopperMouseEnter={handlePopperMouseEnter}
                onMenuMouseLeave={handleMenuMouseLeave}
                onMenuItemMouseEnter={handleMenuItemMouseEnter}
                onItemClick={handleItemClick}
                onClickAway={handleClickAway}
            />
        </Box>
    );
});

Menu.displayName = "Menu";

export default Menu;
