import { ListProps } from '@mui/material/List';
import React from 'react';

export type SidebarMode = 'vertical' | 'horizontal' | 'mini';

// 继承MUI List组件的所有属性，并添加自定义属性
export interface SidebarMenuProps extends Omit<ListProps, 'component'> {
    defaultCollapsed?: boolean;
    mode?: SidebarMode;
    hoverable?: boolean;
    component?: React.ElementType;
}

export interface SidebarMenuRef {
    isCollapsed: boolean;
    toggle: () => void;
    collapse: () => void;
    expand: () => void;
}