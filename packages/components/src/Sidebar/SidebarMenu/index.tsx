import React, {
    useImperativeHandle,
    forwardRef,
    useState,
    useMemo,
    useCallback,
} from 'react';

import type { SidebarMenuProps, SidebarMenuRef } from '../types';
import { styled, List, Box, Divider, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import './index.less';
/**
 * 菜单列表容器样式
 * Menu list container styles
 */
const StyledList = styled(List)(({ theme }) => ({
}));
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    height: 40,
}));

const SidebarMenu = forwardRef<SidebarMenuRef, SidebarMenuProps>((props, ref) => {
    const {
        defaultCollapsed = false,
        mode = 'vertical',
        hoverable = false,
        className,
        children,
        ...listProps // 获取所有其他MUI List属性
    } = props;

    const [collapsed, setCollapsed] = useState(defaultCollapsed);

    const collapse = useCallback(() => setCollapsed(true), []);
    const expand = useCallback(() => setCollapsed(false), []);
    const toggle = useCallback(() => setCollapsed((prev) => !prev), []);

    // 暴露给父组件的状态和操作
    useImperativeHandle(ref, () => ({
        isCollapsed: collapsed,
        collapse,
        expand,
        toggle,
    }), [collapsed, collapse, expand, toggle]);

    const rootClass = useMemo(() => {
        return [
            'sidebar-menu',
            collapsed ? 'collapsed' : '',
            `mode-${mode}`,
            hoverable ? 'hoverable' : '',
            className ?? '',
        ].join(' ');
    }, [collapsed, mode, hoverable, className]);

    return (
        <Box className={rootClass} sx={{ height: '100%', width: '100%', overflowX: 'hidden' }}>
            <StyledList
                disablePadding={true}
                {...listProps} // 传递所有MUI List属性
                sx={{ width: '100%', ...listProps.sx }} // 合并sx属性
            >
                <StyledListItemButton sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                    <ListItemIcon>
                        <Box sx={{ width: 20, height: 20, bgcolor: 'primary.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>🏠</Box>
                    </ListItemIcon>
                    <ListItemText primary="首页" />
                </StyledListItemButton>

                <StyledListItemButton sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                    <ListItemIcon>
                        <Box sx={{ width: 20, height: 20, bgcolor: 'secondary.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>⚙️</Box>
                    </ListItemIcon>
                    <ListItemText primary="设置" />
                </StyledListItemButton>

                <Divider />

                <StyledListItemButton sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                    <ListItemIcon>
                        <Box sx={{ width: 20, height: 20, bgcolor: 'info.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>ℹ️</Box>
                    </ListItemIcon>
                    <ListItemText primary="关于" />
                </StyledListItemButton>
            </StyledList>
        </Box>
    )
});

SidebarMenu.displayName = 'SidebarMenu';

export default SidebarMenu;