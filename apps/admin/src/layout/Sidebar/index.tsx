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
import { useMediaQuery, useTheme, Drawer, Box } from "@mui/material";

// 类型断言确保 JSON 数据符合 NavData 接口
const menuData = menuDataRaw as NavData;

interface SidebarProps {
    mobileOpen: boolean;
    onDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onDrawerToggle }) => {
    const [open, setOpen] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const { updateLayoutConfig, layoutConfig } = useAppTheme();
    const sidebarRef = useRef<HTMLDivElement>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

    // 渲染菜单内容的公共函数
    const renderMenuContent = () => (
        <MenuList
            data={menuData}
            collapsed={isMenuCollapsed}
            config={{
                // 收起时不显示默认展开项
                defaultOpenItems: isMenuCollapsed ? [] : undefined,
            }}
        />
    );

    // 移动端模式：使用抽屉
    if (isMobile) {
        return (
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{
                    keepMounted: true, // 更好的移动端性能
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                        top: 0,
                        height: '100vh',
                        borderRight: (theme) => `1px solid ${theme.customLayout.outlined?.borderColor}`,
                        background: (theme) => theme.palette.background.default,
                    },
                }}
            >
                <Box sx={{ padding: (theme) => theme.spacing(2, 1, 2, 1) }}>
                    {renderMenuContent()}
                </Box>
            </Drawer>
        );
    }

    // 桌面端模式：固定侧边栏
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
                {renderMenuContent()}
            </StyledSidebarNav>
        </StyledSidebarContainer>
    );
};

export default Sidebar;