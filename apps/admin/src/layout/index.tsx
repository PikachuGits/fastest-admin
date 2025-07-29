import React from "react";
import {Box, Container} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {Outlet} from "react-router-dom";

type LayoutMode = 'fixed' | 'fluid';

const Layout = (props: any) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [layoutMode, setLayoutMode] = React.useState<LayoutMode>('fluid');
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const toggleLayoutMode = () => {
        setLayoutMode(prev => prev === 'fixed' ? 'fluid' : 'fixed');
    };

    return (
        // 'rgba(244,240,234, 1)'
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            background: (theme) => theme.palette.background.default
        }}>
            {/* Header */}
            <Header onDrawerToggle={handleDrawerToggle}/>
            {/* 侧边栏和主体区域容器 */}
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                    pt: (theme) => `${theme.customLayout.headerHeight}px`,
                }}
            >
                {/* Sidebar */}
                <Box
                    sx={{
                        width: `${theme.customLayout.sidebarWidth}px`,
                        flexShrink: 0,
                        transition: 'width 0.3s ease',
                        zIndex: theme.zIndex.drawer + 1,
                    }}
                >
                    <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle}/>
                </Box>

                {/* 主内容 */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        width: 0, // 防止内容溢出
                        padding: (theme) => theme.spacing(1, 2, 1, 2),
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Container
                        sx={{
                            height: (theme) => `calc(100vh - ${theme.customLayout.headerHeight}px)`,
                            transition: 'all 0.3s ease',
                        }}
                        maxWidth={layoutMode === 'fixed' ? 'lg' : false}
                        disableGutters={layoutMode === 'fluid'}
                    >
                        {/* 布局模式切换按钮 */}
                        <Box
                            sx={{
                                position: 'fixed',
                                top: (theme) => `${theme.customLayout.headerHeight + 20}px`,
                                right: 20,
                                zIndex: 1000,
                                backgroundColor: 'background.paper',
                                borderRadius: 1,
                                boxShadow: 1,
                                p: 1,
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: 2,
                                },
                            }}
                            onClick={toggleLayoutMode}
                        >
                            <Box
                                sx={{
                                    fontSize: '12px',
                                    color: 'text.secondary',
                                    userSelect: 'none',
                                }}
                            >
                                {layoutMode === 'fixed' ? '定宽模式' : '自适应模式'}
                            </Box>
                        </Box>
                        <Outlet/>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
