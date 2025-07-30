import React, { useLayoutEffect, useRef, useState } from "react";
import { MenuList } from "@fastest/components";
import { useAppTheme } from "@/app/providers/ThemeProvider";
import menuDataRaw from './menu-data.json';
import type { NavData } from "@fastest/components";
import {
    StyledArrowIcon,
    StyledSidebarContainer,
    StyledToggleButton,
    StyledSidebarNav
} from "./sidebar.styles";

// 类型断言确保 JSON 数据符合 NavData 接口
const menuData = menuDataRaw as NavData;

interface SidebarProps {
    mobileOpen: boolean;
    onDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
    const [open, setOpen] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const { updateLayoutConfig, layoutConfig } = useAppTheme();
    const sidebarRef = useRef<HTMLDivElement>(null);

    // 计算菜单是否应该显示为收起状态
    const isMenuCollapsed = !open && !isHovering;

    // 优化：将副作用逻辑与渲染逻辑分离，避免不必要的更新
    useLayoutEffect(() => {
        if (!sidebarRef.current) return;
        // 展开时恢复为默认宽度，收起时为sidebarCollapsedWidth
        if (open) {
            updateLayoutConfig({ sidebarWidth: 300 });
        } else {
            updateLayoutConfig({ sidebarWidth: layoutConfig.sidebarCollapsedWidth });
        }
    }, [open, layoutConfig.sidebarCollapsedWidth, updateLayoutConfig]);

    // 处理鼠标进入事件
    const handleMouseEnter = () => {
        if (!open) {
            setIsHovering(true);
        }
    };

    // 处理鼠标离开事件
    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <StyledSidebarContainer
            ref={sidebarRef}
            sx={{
                border: '1px solid rgba(0, 0, 0, 0.1)',
                width: (theme) => theme.customLayout.sidebarWidth,
                // 当悬停时临时展开宽度
                ...(isHovering && !open && {
                    width: 300,
                }),
            }}
        >
            <StyledToggleButton onClick={() => setOpen((prev) => !prev)}>
                <StyledArrowIcon
                    icon="eva:arrow-ios-downward-fill"
                    open={open}
                    className="icon-arrow"
                />
            </StyledToggleButton>
            <StyledSidebarNav
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <MenuList
                    data={menuData}
                    collapsed={isMenuCollapsed}
                    config={{
                        // 收起时不显示默认展开项
                        defaultOpenItems: isMenuCollapsed ? [] : undefined,
                    }}
                />
            </StyledSidebarNav>
        </StyledSidebarContainer>
    );
};

export default Sidebar;
