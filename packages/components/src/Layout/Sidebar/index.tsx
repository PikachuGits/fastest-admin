import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Divider,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

interface MenuRecord {
  name: string;
  path: string;
  icon?: React.ReactNode;
  children?: MenuRecord[];
  meta?: {
    title?: string;
    hidden?: boolean;
  };
}

interface SidebarProps {
  menus: MenuRecord[];
  collapsed: boolean;
  theme: 'light' | 'dark';
  accordion: boolean;
  rounded: boolean;
  activeMenu: string;
  onMenuSelect: (path: string) => void;
}

const SidebarMenuItem: React.FC<{
  menu: MenuRecord;
  level: number;
  collapsed: boolean;
  theme: 'light' | 'dark';
  rounded: boolean;
  activeMenu: string;
  accordion: boolean;
  onMenuSelect: (path: string) => void;
}> = ({
  menu,
  level,
  collapsed,
  theme,
  rounded,
  activeMenu,
  accordion,
  onMenuSelect,
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = menu.children && menu.children.length > 0;
  const isActive = activeMenu === menu.path;

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else {
      onMenuSelect(menu.path);
    }
  };

  const getDefaultIcon = () => {
    if (menu.icon) return menu.icon;

    // 根据菜单名称返回默认图标
    if (menu.name.toLowerCase().includes('dashboard')) return <DashboardIcon />;
    if (menu.name.toLowerCase().includes('user')) return <PeopleIcon />;
    return <SettingsIcon />;
  };

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          onClick={handleClick}
          sx={{
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'flex-start',
            px: 2.5,
            ml: level * 2,
            borderRadius: rounded ? 2 : 0,
            backgroundColor: isActive ? 'action.selected' : 'transparent',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: collapsed ? 'auto' : 3,
              justifyContent: 'center',
              color: isActive ? 'primary.main' : 'inherit',
            }}
          >
            {getDefaultIcon()}
          </ListItemIcon>
          <ListItemText
            primary={menu.name}
            sx={{
              opacity: collapsed ? 0 : 1,
              color: isActive ? 'primary.main' : 'inherit',
            }}
          />
          {hasChildren &&
            !collapsed &&
            (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>

      {hasChildren && !collapsed && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menu.children?.map((child) => (
              <SidebarMenuItem
                key={child.path}
                menu={child}
                level={level + 1}
                collapsed={false}
                theme={theme}
                rounded={rounded}
                activeMenu={activeMenu}
                accordion={accordion}
                onMenuSelect={onMenuSelect}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const LayoutSidebar: React.FC<SidebarProps> = ({
  menus,
  collapsed,
  theme,
  accordion,
  rounded,
  activeMenu,
  onMenuSelect,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: theme === 'dark' ? 'grey.900' : 'background.paper',
        color: theme === 'dark' ? 'common.white' : 'text.primary',
      }}
    >
      <List>
        {menus.map((menu, index) => (
          <React.Fragment key={menu.path}>
            <SidebarMenuItem
              menu={menu}
              level={0}
              collapsed={collapsed}
              theme={theme}
              rounded={rounded}
              activeMenu={activeMenu}
              accordion={accordion}
              onMenuSelect={onMenuSelect}
            />
            {index < menus.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default LayoutSidebar;
