/**
 * SidebarDemo 组件
 * SidebarDemo Component
 * 
 * 用于演示侧边栏功能的示例组件
 * Example component for demonstrating sidebar functionality
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import SidebarMenu from './SidebarMenu';

/**
 * SidebarDemo 组件
 * SidebarDemo Component
 * 
 * 提供侧边栏的演示界面
 * Provides demonstration interface for sidebar
 */
export const SidebarDemo: React.FC = () => {
  return (
    <Box
      sx={{
        width: 300,
        height: 400,
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6" component="h3">
          侧边栏演示
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sidebar Demo
        </Typography>
      </Box>
      
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <SidebarMenu />
      </Box>
    </Box>
  );
};

export default SidebarDemo;