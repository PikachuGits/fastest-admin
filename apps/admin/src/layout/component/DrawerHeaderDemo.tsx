import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Button,
  Paper,
  Typography,
  Container,
} from '@mui/material';
import DrawerHeader from './DrawerHeader';

const DrawerHeaderDemo: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showResetBadge, setShowResetBadge] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleReset = () => {
    setShowResetBadge(false);
    // 这里可以添加重置设置的逻辑
    console.log('Settings reset');
    // 模拟重置后重新显示badge
    setTimeout(() => {
      setShowResetBadge(true);
    }, 2000);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Drawer Header 组件演示
        </Typography>
        
        <Typography variant="body1" paragraph>
          这是从编译后的HTML转换而来的MUI Drawer Header组件。
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          功能特性：
        </Typography>
        
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body2">
            标题显示："Settings"
          </Typography>
          <Typography component="li" variant="body2">
            全屏按钮：点击可切换全屏模式
          </Typography>
          <Typography component="li" variant="body2">
            重置按钮：带有红色圆点徽章提示
          </Typography>
          <Typography component="li" variant="body2">
            关闭按钮：关闭抽屉
          </Typography>
          <Typography component="li" variant="body2">
            完全保留原始样式和图标
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          onClick={() => setDrawerOpen(true)}
          sx={{ mt: 3 }}
        >
          打开设置抽屉
        </Button>
      </Paper>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
          },
        }}
      >
        <DrawerHeader
          onFullscreen={handleFullscreen}
          onReset={handleReset}
          onClose={handleClose}
          showResetBadge={showResetBadge}
        />
        
        {/* 抽屉内容区域 */}
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            这里是抽屉的内容区域。Header组件已经完美转换为MUI组件，
            保持了原始的视觉效果和交互功能。
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" display="block">
              当前状态：
            </Typography>
            <Typography variant="body2">
              • 全屏模式: {isFullscreen ? '开启' : '关闭'}
            </Typography>
            <Typography variant="body2">
              • 重置徽章: {showResetBadge ? '显示' : '隐藏'}
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Container>
  );
};

export default DrawerHeaderDemo;