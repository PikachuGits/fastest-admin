import React from 'react';
import {
  Toolbar,
  IconButton,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';

interface BreadcrumbProps {
  showHome: boolean;
  showIcon: boolean;
  hideOnlyOne: boolean;
  styleType: 'default' | 'background';
}

interface HeaderProps {
  theme: 'light' | 'dark';
  showToggle: boolean;
  showHeaderNav: boolean;
  menus: any[];
  activeMenu: string;
  breadcrumbEnable: boolean;
  breadcrumbProps: BreadcrumbProps;
  onToggle: () => void;
  onMenuSelect: (menuPath: string) => void;
  onClearPreferencesAndLogout?: () => void;
  slots?: {
    userDropdown?: React.ReactNode;
    notification?: React.ReactNode;
    headerLeft?: React.ReactNode[];
    headerRight?: React.ReactNode[];
  };
}

const HeaderBreadcrumb: React.FC<BreadcrumbProps> = ({
  showHome,
  showIcon,
  hideOnlyOne,
  styleType,
}) => {
  const theme = useTheme();

  // 模拟面包屑数据
  const breadcrumbs = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <HomeIcon fontSize="small" />,
    },
    { name: 'User Management', path: '/user', icon: null },
    { name: 'User List', path: '/user/list', icon: null },
  ];

  if (hideOnlyOne && breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <Box
      sx={{
        padding: styleType === 'background' ? theme.spacing(1) : 0,
        backgroundColor:
          styleType === 'background'
            ? theme.palette.action.hover
            : 'transparent',
        borderRadius: styleType === 'background' ? 1 : 0,
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const shouldShowIcon = showIcon && item.icon;

          return isLast ? (
            <Typography
              key={item.path}
              color="text.primary"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              {shouldShowIcon && item.icon}
              {item.name}
            </Typography>
          ) : (
            <Link
              key={item.path}
              underline="hover"
              color="inherit"
              href={item.path}
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              {shouldShowIcon && item.icon}
              {item.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

const HeaderNavMenu: React.FC<{
  menus: any[];
  activeMenu: string;
  onMenuSelect: (path: string) => void;
}> = ({ menus, activeMenu, onMenuSelect }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {menus.map((menu) => (
        <Link
          key={menu.path}
          component="button"
          variant="body2"
          onClick={() => onMenuSelect(menu.path)}
          sx={{
            color: activeMenu === menu.path ? 'primary.main' : 'text.primary',
            textDecoration: 'none',
            padding: 1,
            borderRadius: 1,
            backgroundColor:
              activeMenu === menu.path ? 'action.selected' : 'transparent',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {menu.name}
        </Link>
      ))}
    </Box>
  );
};

const LayoutHeader: React.FC<HeaderProps> = ({
  theme,
  showToggle,
  showHeaderNav,
  menus,
  activeMenu,
  breadcrumbEnable,
  breadcrumbProps,
  onToggle,
  onMenuSelect,
  onClearPreferencesAndLogout,
  slots = {},
}) => {
  return (
    <Toolbar
      sx={{ justifyContent: 'space-between', minHeight: '64px !important' }}
    >
      {/* 左侧区域 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* 菜单切换按钮 */}
        {showToggle && (
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={onToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* 头部左侧插槽 */}
        {slots.headerLeft?.map((slot, index) => (
          <Box key={index}>{slot}</Box>
        ))}

        {/* 面包屑导航 */}
        {breadcrumbEnable && !showHeaderNav && (
          <HeaderBreadcrumb {...breadcrumbProps} />
        )}

        {/* 头部菜单 */}
        {showHeaderNav && (
          <HeaderNavMenu
            menus={menus}
            activeMenu={activeMenu}
            onMenuSelect={onMenuSelect}
          />
        )}
      </Box>

      {/* 右侧区域 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* 头部右侧插槽 */}
        {slots.headerRight?.map((slot, index) => (
          <Box key={index}>{slot}</Box>
        ))}

        {/* 通知 */}
        {slots.notification}

        {/* 用户下拉菜单 */}
        {slots.userDropdown}
      </Box>
    </Toolbar>
  );
};

export default LayoutHeader;
