import { styled } from '@mui/material/styles';
import { AppBar, IconButton, Box, Toolbar } from '@mui/material';

// Header 主容器
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer - 1,
}));

// Toolbar 容器
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: theme.customLayout.headerHeight,
  // 可以在这里添加自定义样式
  padding: theme.spacing(0, 1, 0, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,

}));

// 通用图标按钮样式
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 2px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    scale: 1.05,
  },
}));

// 右侧图标按钮样式（带过渡动画）
export const StyledRightIconButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 2px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    scale: 1.05,
  },
}));

// 头像图标按钮样式
export const StyledAvatarIconButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease-in-out',
  marginLeft: '10px',
  padding: theme.spacing(0.5),
  '&:hover': {
    scale: 1.05,
  },
}));

// 主内容容器
export const StyledMainBox = styled(Box)(() => ({
  flexGrow: 1,
}));