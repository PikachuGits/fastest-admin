import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

// 布局模式类型
type LayoutMode = 'fixed' | 'fluid';

// 主布局容器
export const StyledLayoutRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  background: theme.palette.background.default,
}));

// 侧边栏和主体区域容器
export const StyledContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  width: '100%',
  paddingTop: `${theme.customLayout.headerHeight}px`,
}));

// 侧边栏容器
export const StyledSidebarWrapper = styled(Box)(({ theme }) => ({
  width: `${theme.customLayout.sidebarWidth}px`,
  flexShrink: 0,
  transition: 'width 0.3s ease',
  zIndex: theme.zIndex.drawer,
  // 移动端隐藏侧边栏容器
  [theme.breakpoints.down('md')]: {
    width: 0,
    display: 'none',
  },
}));

// 主内容区域
export const StyledMainContent = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
  flexGrow: 1,
  width: 0, // 防止内容溢出
  padding: theme.spacing(1, 2, 1, 2),
  transition: 'all 0.3s ease',
}));

// 主内容容器
export const StyledMainContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== 'layoutMode',
})<{ layoutMode: LayoutMode }>(({ theme, layoutMode }) => ({
  height: `calc(100vh - ${theme.customLayout.headerHeight}px)`,
  transition: 'all 0.3s ease',
}));

// 布局模式切换按钮
export const StyledLayoutModeToggle = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: `${theme.customLayout.headerHeight + 20}px`,
  right: 20,
  zIndex: 1000,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

// 布局模式切换按钮文本
export const StyledLayoutModeText = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
  userSelect: 'none',
}));