import React, { useEffect, useState, useMemo } from "react";
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
import {
    useMenuEventHandlers,
    useFloatingMenuHandlers,
    type ActiveMenu,
} from "./services";
import "@components/Sidebar/styles/global.less";

/** Menu组件属性接口 */
interface MenuProps {
    /** 是否折叠状态 - true: 折叠, false: 展开 */
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

    // 菜单数据 - 使用useMemo优化
    const data = useMemo(() => menuData as unknown as MenuSection[], []);

    // 同步外部collapsed状态
    useEffect(() => {
        if (propCollapsed !== undefined) {
            console.log(propCollapsed, "props.collapsed");
            setCollapsed(propCollapsed);
        }
    }, [propCollapsed, setCollapsed]);

    // ==================== 使用服务处理器 Service Handlers ====================

    // 菜单事件处理器
    const {
        handleSectionClick,
        handleItemClick,
    } = useMenuEventHandlers({
        toggleExpand: (id: string) => {
            toggleExpand(id);
        },
        selectItem: (id: string, menuData: MenuSection[]) => {
            selectItem(id, menuData);
        },
        data,
    });

    // 悬浮菜单处理器
    const {
        handleSectionMouseEnter,
        handleSectionMouseLeave,
        handleMenuItemMouseEnter,
        handleMenuMouseLeave,
        handlePopperMouseEnter,
        handleClickAway,
        hoverTimeoutRef,
    } = useFloatingMenuHandlers({
        collapsed,
        setActiveMenus,
    });

    // 清理定时器
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
            }
        };
    }, [hoverTimeoutRef]);

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
