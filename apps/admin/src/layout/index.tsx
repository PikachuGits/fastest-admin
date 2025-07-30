import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import {
    StyledLayoutRoot,
    StyledContentWrapper,
    StyledSidebarWrapper,
    StyledMainContent,
    StyledMainContainer,
    StyledLayoutModeToggle,
    StyledLayoutModeText
} from "./layout.styles";

type LayoutMode = 'fixed' | 'fluid';

const Layout = (props: any) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [layoutMode, setLayoutMode] = React.useState<LayoutMode>('fluid');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const toggleLayoutMode = () => {
        setLayoutMode(prev => prev === 'fixed' ? 'fluid' : 'fixed');
    };

    return (
        <StyledLayoutRoot>
            {/* Header */}
            <Header onDrawerToggle={handleDrawerToggle} />
            {/* 侧边栏和主体区域容器 */}
            <StyledContentWrapper>
                {/* Sidebar */}
                <StyledSidebarWrapper>
                    <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
                </StyledSidebarWrapper>

                {/* 主内容 */}
                <StyledMainContent component="main">
                    <StyledMainContainer
                        layoutMode={layoutMode}
                        maxWidth={layoutMode === 'fixed' ? 'lg' : false}
                        disableGutters={layoutMode === 'fluid'}
                    >
                        {/* 布局模式切换按钮 */}
                        <StyledLayoutModeToggle onClick={toggleLayoutMode}>
                            <StyledLayoutModeText>
                                {layoutMode === 'fixed' ? '定宽模式' : '自适应模式'}
                            </StyledLayoutModeText>
                        </StyledLayoutModeToggle>
                        <Outlet />
                    </StyledMainContainer>
                </StyledMainContent>
            </StyledContentWrapper>
        </StyledLayoutRoot>
    );
};

export default Layout;
