// ==================== 菜单服务统一导出 Menu Services Exports ====================

// 菜单事件处理服务
export {
    MenuEventService,
    createMenuEventService,
    useMenuEventHandlers,
    type MenuEventServiceConfig,
} from "./MenuEventService";

// 悬浮菜单管理服务
export {
    FloatingMenuService,
    createFloatingMenuService,
    useFloatingMenuHandlers,
    HOVER_DELAYS,
    type ActiveMenu,
    type FloatingMenuServiceConfig,
} from "./MenuFloating";