import React, { useRef, useEffect } from 'react';
import { SidebarMenu, type SidebarMenuRef } from '@fastest/components';
import { Box, ListItemIcon, ListItemText, Divider, ListItemButton, Button, Typography } from '@mui/material';
const Home = () => {
  const sidebarMenuRef = useRef<SidebarMenuRef>(null);


  useEffect(() => {
    console.log(sidebarMenuRef.current);
  }, [sidebarMenuRef]);

  const handleToggle = () => {
    sidebarMenuRef.current?.toggle();
  };

  const handleCollapse = () => {
    sidebarMenuRef.current?.collapse();
  };

  const handleExpand = () => {
    sidebarMenuRef.current?.expand();
  };

  const getStatus = () => {
    return sidebarMenuRef.current?.isCollapsed ? '收起' : '展开';
  };


  return (
    <Box className="flex">
      <Box className="border" sx={{ height: (theme) => `calc(100vh - ${theme.customLayout.headerHeight + 10}px)`, width: '300px' }}>
        <SidebarMenu
          ref={sidebarMenuRef}
          defaultCollapsed={false}
          mode="vertical"
          hoverable={true}
          dense={false}
          disablePadding={false}
          // subheader="导航菜单"
          sx={{
            bgcolor: 'background.paper',
            '& .sidebar-menu': {
              transition: 'all 0.3s ease'
            },
            '& .collapsed': {
              '& .MuiListItemText-root': {
                opacity: 0.5
              }
            }
          }}
        >
          <ListItemButton sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
            <ListItemIcon>
              <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>🏠</Box>
            </ListItemIcon>
            <ListItemText primary="首页" />
          </ListItemButton>

          <ListItemButton sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
            <ListItemIcon>
              <Box sx={{ width: 24, height: 24, bgcolor: 'secondary.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>⚙️</Box>
            </ListItemIcon>
            <ListItemText primary="设置" />
          </ListItemButton>

          <Divider />

          <ListItemButton sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
            <ListItemIcon>
              <Box sx={{ width: 24, height: 24, bgcolor: 'info.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>ℹ️</Box>
            </ListItemIcon>
            <ListItemText primary="关于" />
          </ListItemButton>
        </SidebarMenu>
      </Box>
      {/* 右侧：控制面板 */}
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="h5" gutterBottom>
          SidebarMenu 组件测试页面
        </Typography>

        <Typography variant="body1" paragraph>
          这个页面用于测试 SidebarMenu 组件的功能，包括：
        </Typography>

        <Typography component="ul" variant="body2" sx={{ mb: 3 }}>
          <li>forwardRef 暴露的方法（toggle, collapse, expand, isCollapsed）</li>
          <li>继承 MUI List 组件的所有属性</li>
          <li>自定义属性（mode, hoverable, defaultCollapsed）</li>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button variant="contained" onClick={handleToggle}>
            切换状态
          </Button>
          <Button variant="outlined" onClick={handleCollapse}>
            收起
          </Button>
          <Button variant="outlined" onClick={handleExpand}>
            展开
          </Button>
        </Box>

        <Typography variant="body1">
          当前状态: <strong>{getStatus()}</strong>
        </Typography>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            组件特性说明：
          </Typography>
          <Typography variant="body2" component="div">
            <strong>继承的 MUI List 属性：</strong>
            <ul>
              <li>dense: 紧凑模式</li>
              <li>disablePadding: 禁用内边距</li>
              <li>subheader: 子标题</li>
              <li>sx: 样式属性</li>
              <li>component: 自定义根元素</li>
            </ul>

            <strong>自定义属性：</strong>
            <ul>
              <li>defaultCollapsed: 默认收起状态</li>
              <li>mode: 布局模式（vertical/horizontal/mini）</li>
              <li>hoverable: 悬停交互</li>
            </ul>

            <strong>暴露的方法：</strong>
            <ul>
              <li>isCollapsed: 获取当前收起状态</li>
              <li>toggle(): 切换收起/展开</li>
              <li>collapse(): 收起</li>
              <li>expand(): 展开</li>
            </ul>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;