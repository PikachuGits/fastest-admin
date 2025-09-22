import React, { useRef, useCallback } from "react";
import type { MenuSection, MenuItem as MenuItemType } from "@components/Sidebar/types";

// ==================== 常量定义 Constants ====================

/** 悬浮菜单延迟时间配置 */
export const HOVER_DELAYS = {
    /** 鼠标离开后关闭菜单的延迟时间(ms) */
    CLOSE_DELAY: 100,
    /** 鼠标离开菜单后关闭子菜单的延迟时间(ms) */
    SUBMENU_CLOSE_DELAY: 150,
} as const;

// ==================== 类型定义 Type Definitions ====================

/** 悬浮菜单项接口 */
export interface ActiveMenu {
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

/** 悬浮菜单服务配置接口 */
export interface FloatingMenuServiceConfig {
    /** 是否折叠状态 - true: 折叠, false: 展开 */
    collapsed: boolean;
    /** 设置活动菜单的回调 */
    setActiveMenus: React.Dispatch<React.SetStateAction<ActiveMenu[]>>;
}

// ==================== 悬浮菜单服务类 Floating Menu Service Class ====================

export class FloatingMenuService {
    private config: FloatingMenuServiceConfig;
    private hoverTimeoutRef: { current: NodeJS.Timeout | null };

    constructor(config: FloatingMenuServiceConfig) {
        this.config = config;
        this.hoverTimeoutRef = { current: null };
    }

    /**
     * 清除悬浮菜单延迟定时器
     */
    clearHoverTimeout = (): void => {
        if (this.hoverTimeoutRef.current) {
            clearTimeout(this.hoverTimeoutRef.current);
            this.hoverTimeoutRef.current = null;
        }
    };

    /**
     * 设置悬浮菜单延迟关闭
     * @param callback 回调函数
     * @param delay 延迟时间
     */
    setHoverTimeout = (callback: () => void, delay: number): void => {
        this.clearHoverTimeout();
        this.hoverTimeoutRef.current = setTimeout(callback, delay);
    };

    /**
     * 处理分组鼠标进入事件
     * @param event 鼠标事件
     * @param section 菜单分组
     */
    handleSectionMouseEnter = (
        event: React.MouseEvent<HTMLElement>,
        section: MenuSection
    ): void => {
        if (!this.config.collapsed) return; // 只在折叠状态下启用悬浮菜单

        this.clearHoverTimeout();

        // 显示第一级菜单
        this.config.setActiveMenus([
            {
                id: section.id.toString(),
                anchorEl: event.currentTarget,
                items: section.items,
                level: 0,
                title: section.subheader,
            },
        ]);
    };

    /**
     * 处理分组鼠标离开事件
     */
    handleSectionMouseLeave = (): void => {
        if (!this.config.collapsed) return;

        this.setHoverTimeout(() => {
            this.config.setActiveMenus([]);
        }, HOVER_DELAYS.CLOSE_DELAY);
    };

    /**
     * 处理菜单项鼠标进入事件
     * @param event 鼠标事件
     * @param item 菜单项
     * @param level 菜单层级
     */
    handleMenuItemMouseEnter = (
        event: React.MouseEvent<HTMLElement>,
        item: MenuItemType,
        level: number
    ): void => {
        this.clearHoverTimeout();

        // 如果有子菜单，显示下一级
        if (item.children && item.children.length > 0) {
            this.config.setActiveMenus((prev) => {
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
            this.config.setActiveMenus((prev) => prev.slice(0, level + 1));
        }
    };

    /**
     * 处理菜单鼠标离开事件
     */
    handleMenuMouseLeave = (): void => {
        this.setHoverTimeout(() => {
            this.config.setActiveMenus([]);
        }, HOVER_DELAYS.SUBMENU_CLOSE_DELAY);
    };

    /**
     * 处理Popper鼠标进入事件
     */
    handlePopperMouseEnter = (): void => {
        this.clearHoverTimeout();
    };

    /**
     * 处理点击外部区域事件
     */
    handleClickAway = (): void => {
        this.config.setActiveMenus([]);
    };

    /**
     * 更新配置
     * @param newConfig 新的配置
     */
    updateConfig(newConfig: Partial<FloatingMenuServiceConfig>): void {
        this.config = { ...this.config, ...newConfig };
    }

    /**
     * 清理资源
     */
    cleanup(): void {
        this.clearHoverTimeout();
    }

    /**
     * 获取超时引用（用于外部清理）
     */
    getTimeoutRef(): React.MutableRefObject<NodeJS.Timeout | null> {
        return this.hoverTimeoutRef;
    }
}

// ==================== 工厂函数 Factory Functions ====================

/**
 * 创建悬浮菜单服务实例
 * @param config 服务配置
 * @returns 悬浮菜单服务实例
 */
export const createFloatingMenuService = (config: FloatingMenuServiceConfig): FloatingMenuService => {
    return new FloatingMenuService(config);
};

// ==================== Hook 函数 Hook Functions ====================

/**
 * 创建悬浮菜单处理器的 Hook
 * @param config 服务配置
 * @returns 悬浮菜单处理器对象
 */
export const useFloatingMenuHandlers = (config: FloatingMenuServiceConfig) => {
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const service = new FloatingMenuService({
        ...config,
    });

    // 使用外部的 ref
    service.getTimeoutRef().current = hoverTimeoutRef.current;

    const clearHoverTimeout = useCallback(() => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    }, []);

    const setHoverTimeout = useCallback((callback: () => void, delay: number) => {
        clearHoverTimeout();
        hoverTimeoutRef.current = setTimeout(callback, delay);
    }, [clearHoverTimeout]);

    const handleSectionMouseEnter = useCallback((
        event: React.MouseEvent<HTMLElement>,
        section: MenuSection
    ) => {
        if (!config.collapsed) return;

        clearHoverTimeout();
        config.setActiveMenus([
            {
                id: section.id.toString(),
                anchorEl: event.currentTarget,
                items: section.items,
                level: 0,
                title: section.subheader,
            },
        ]);
    }, [config.collapsed, config.setActiveMenus, clearHoverTimeout]);

    const handleSectionMouseLeave = useCallback(() => {
        if (!config.collapsed) return;

        setHoverTimeout(() => {
            config.setActiveMenus([]);
        }, HOVER_DELAYS.CLOSE_DELAY);
    }, [config.collapsed, config.setActiveMenus, setHoverTimeout]);

    const handleMenuItemMouseEnter = useCallback((
        event: React.MouseEvent<HTMLElement>,
        item: MenuItemType,
        level: number
    ) => {
        clearHoverTimeout();

        if (item.children && item.children.length > 0) {
            config.setActiveMenus((prev) => {
                const currentLevelMenus = prev.slice(0, level + 1);
                return [
                    ...currentLevelMenus,
                    {
                        id: item.id.toString(),
                        anchorEl: event.currentTarget,
                        items: item.children || [],
                        level: level + 1,
                        title: item.title,
                    },
                ];
            });
        } else {
            config.setActiveMenus((prev) => prev.slice(0, level + 1));
        }
    }, [config.setActiveMenus, clearHoverTimeout]);

    const handleMenuMouseLeave = useCallback(() => {
        setHoverTimeout(() => {
            config.setActiveMenus([]);
        }, HOVER_DELAYS.SUBMENU_CLOSE_DELAY);
    }, [config.setActiveMenus, setHoverTimeout]);

    const handlePopperMouseEnter = useCallback(() => {
        clearHoverTimeout();
    }, [clearHoverTimeout]);

    const handleClickAway = useCallback(() => {
        config.setActiveMenus([]);
    }, [config.setActiveMenus]);

    return {
        handleSectionMouseEnter,
        handleSectionMouseLeave,
        handleMenuItemMouseEnter,
        handleMenuMouseLeave,
        handlePopperMouseEnter,
        handleClickAway,
        clearHoverTimeout,
        hoverTimeoutRef,
    };
};