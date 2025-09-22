import type { MenuSection, MenuItem as MenuItemType } from "@components/Sidebar/types";

// ==================== 类型定义 Type Definitions ====================

/** 菜单事件处理服务的配置接口 */
export interface MenuEventServiceConfig {
    /** 切换展开状态的回调 */
    toggleExpand: (id: string) => void;
    /** 选中菜单项的回调 */
    selectItem: (id: string, data: MenuSection[]) => void;
    /** 菜单数据 */
    data: MenuSection[];
}

/** 菜单事件处理服务类 */
export class MenuEventService {
    private config: MenuEventServiceConfig;

    constructor(config: MenuEventServiceConfig) {
        this.config = config;
    }

    /**
     * 处理分组点击事件
     * @param section 菜单分组
     */
    handleSectionClick = (section: MenuSection): void => {
        console.log("Section clicked:", section);
        this.config.toggleExpand(section.id.toString());
    };

    /**
     * 处理菜单项点击事件
     * @param item 菜单项
     */
    handleItemClick = (item: MenuItemType): void => {
        console.log("Menu item clicked:", item);
        // 如果有子项，切换展开状态；否则选中该项
        if (item.children?.length) {
            this.config.toggleExpand(item.id.toString());
        } else {
            this.config.selectItem(item.id.toString(), this.config.data);
            // 这里可以添加路由跳转或其他业务逻辑
        }
    };

    /**
     * 更新配置
     * @param newConfig 新的配置
     */
    updateConfig(newConfig: Partial<MenuEventServiceConfig>): void {
        this.config = { ...this.config, ...newConfig };
    }
}

// ==================== 工厂函数 Factory Functions ====================

/**
 * 创建菜单事件处理服务实例
 * @param config 服务配置
 * @returns 菜单事件处理服务实例
 */
export const createMenuEventService = (config: MenuEventServiceConfig): MenuEventService => {
    return new MenuEventService(config);
};

// ==================== Hook 函数 Hook Functions ====================

/**
 * 创建菜单事件处理器的 Hook
 * @param config 服务配置
 * @returns 事件处理器对象
 */
export const useMenuEventHandlers = (config: MenuEventServiceConfig) => {
    const service = new MenuEventService(config);
    
    return {
        handleSectionClick: service.handleSectionClick,
        handleItemClick: service.handleItemClick,
        updateConfig: service.updateConfig.bind(service),
    };
};