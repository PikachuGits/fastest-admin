/**
 * 统一主题系统使用示例
 * Unified Theme System Usage Example
 * 
 * 这个组件展示了如何在实际项目中使用统一的主题系统，
 * 包括 MUI 组件和 UnoCSS 类名的混合使用。
 * 
 * @module ThemeExample
 * @version 1.0.0
 * @author Trae AI
 */

import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Chip,
  Alert,
  Paper,
  Stack,
  Grid,
} from '@mui/material';

// 临时定义 useEnhancedTheme hook
function useEnhancedTheme() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const layoutConfig = {
    headerHeight: 64,
    sidebarWidth: 280,
    contentPadding: 24,
  };

  return {
    isDarkMode,
    toggleTheme,
    layoutConfig,
  };
}

// ----------------------------------------------------------------------

/**
 * 主题示例组件属性
 */
export interface ThemeExampleProps {
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 统一主题系统使用示例
 * 
 * 展示如何在同一个组件中混合使用：
 * - MUI 组件（使用主题系统的颜色和样式）
 * - UnoCSS 原子类（使用相同的设计令牌）
 * - 自定义样式（基于设计令牌）
 * 
 * @param props - 组件属性
 * @returns JSX 元素
 * 
 * @example
 * ```tsx
 * import { ThemeExample } from '@fastest/components';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <h1>主题系统示例</h1>
 *       <ThemeExample />
 *     </div>
 *   );
 * }
 * ```
 */
export function ThemeExample({ className, style }: ThemeExampleProps) {
  const { isDarkMode, toggleTheme, layoutConfig } = useEnhancedTheme();

  return (
    <Box className={className} style={style}>
      {/* 页面标题 - 使用 MUI Typography + UnoCSS 间距 */}
      <Typography
        variant="h4"
        component="h1"
        className="mb-8 text-center"
        color="primary"
      >
        🎨 统一主题系统示例
      </Typography>

      {/* 主题切换控制 */}
      <Paper className="p-6 mb-8 bg-neutral">
        <Stack direction="row" spacing={2} alignItems="center" className="mb-4">
          <Typography variant="h6">主题控制</Typography>
          <Chip
            label={isDarkMode ? '暗色模式' : '亮色模式'}
            color={isDarkMode ? 'secondary' : 'primary'}
            className="ml-auto"
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={toggleTheme}
            className="btn-primary"
          >
            切换主题模式
          </Button>

          <Button
            variant="outlined"
            className="btn-outline"
          >
            UnoCSS 按钮样式
          </Button>
        </Stack>
      </Paper>

      {/* 颜色系统展示 */}
      <Grid container spacing={3} className="mb-8">
        <Grid sx={{ xs: 12 }}>
          <Typography variant="h5" className="mb-4">🎨 颜色系统</Typography>
        </Grid>

        {/* 主色系 */}
        <Grid sx={{ xs: 12, md: 6 }}>
          <Card className="card-hover">
            <CardContent>
              <Typography variant="h6" className="mb-4">主色系 (Primary)</Typography>
              <Stack direction="row" spacing={1} className="mb-2">
                <div className="w-12 h-12 bg-primary-light rounded-md"></div>
                <div className="w-12 h-12 bg-primary-main rounded-md"></div>
                <div className="w-12 h-12 bg-primary-dark rounded-md"></div>
              </Stack>
              <Button variant="contained" color="primary" size="small">
                MUI 主色按钮
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* 语义色系 */}
        <Grid sx={{ xs: 12, md: 6 }}>
          <Card className="card-hover">
            <CardContent>
              <Typography variant="h6" className="mb-4">语义色系</Typography>
              <Stack spacing={1}>
                <Alert severity="success" className="text-sm">成功状态 - 使用 success 色系</Alert>
                <Alert severity="warning" className="text-sm">警告状态 - 使用 warning 色系</Alert>
                <Alert severity="error" className="text-sm">错误状态 - 使用 error 色系</Alert>
                <Alert severity="info" className="text-sm">信息状态 - 使用 info 色系</Alert>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 组件样式展示 */}
      <Grid container spacing={3} className="mb-8">
        <Grid sx={{ xs: 12 }}>
          <Typography variant="h5" className="mb-4">🧩 组件样式</Typography>
        </Grid>

        {/* 表单组件 */}
        <Grid sx={{ xs: 12, md: 6 }}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="mb-4">表单组件</Typography>
              <Stack spacing={3}>
                <TextField
                  label="标准输入框"
                  variant="outlined"
                  fullWidth
                  className="input"
                />
                <TextField
                  label="错误状态"
                  variant="outlined"
                  fullWidth
                  error
                  helperText="这是一个错误提示"
                  className="input-error"
                />
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" className="btn-success">
                    成功按钮
                  </Button>
                  <Button variant="contained" className="btn-warning">
                    警告按钮
                  </Button>
                  <Button variant="contained" className="btn-error">
                    错误按钮
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* 布局信息 */}
        <Grid sx={{ xs: 12, md: 6 }}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="mb-4">布局配置</Typography>
              <Stack spacing={2}>
                <Box className="flex-between p-3 bg-gray-100 rounded-md">
                  <Typography variant="body2">头部高度:</Typography>
                  <Chip label={`${layoutConfig.headerHeight}px`} size="small" />
                </Box>
                <Box className="flex-between p-3 bg-gray-100 rounded-md">
                  <Typography variant="body2">侧边栏宽度:</Typography>
                  <Chip label={`${layoutConfig.sidebarWidth}px`} size="small" />
                </Box>
                <Box className="flex-between p-3 bg-gray-100 rounded-md">
                  <Typography variant="body2">内容边距:</Typography>
                  <Chip label={`${layoutConfig.contentPadding}px`} size="small" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* UnoCSS 原子类展示 */}
      <Paper className="p-6 mb-8">
        <Typography variant="h5" className="mb-4">⚛️ UnoCSS 原子类</Typography>
        <Grid container spacing={2}>
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <div className="p-4 bg-primary-main text-white rounded-lg text-center">
              <Typography variant="body2">主色背景</Typography>
              <code className="text-xs opacity-75">.bg-primary-main</code>
            </div>
          </Grid>
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <div className="p-4 bg-success-main text-white rounded-lg text-center">
              <Typography variant="body2">成功色背景</Typography>
              <code className="text-xs opacity-75">.bg-success-main</code>
            </div>
          </Grid>
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <div className="p-4 bg-warning-main text-black rounded-lg text-center">
              <Typography variant="body2">警告色背景</Typography>
              <code className="text-xs opacity-75">.bg-warning-main</code>
            </div>
          </Grid>
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <div className="p-4 bg-error-main text-white rounded-lg text-center">
              <Typography variant="body2">错误色背景</Typography>
              <code className="text-xs opacity-75">.bg-error-main</code>
            </div>
          </Grid>
        </Grid>
      </Paper>

      {/* 间距系统展示 */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">📐 间距系统</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600">
          所有间距值都基于统一的设计令牌，确保 MUI 和 UnoCSS 使用相同的间距标准。
        </Typography>
        <Stack direction="row" spacing={1} className="mb-4">
          <div className="w-4 h-4 bg-primary-main"></div>
          <div className="w-8 h-8 bg-primary-main"></div>
          <div className="w-12 h-12 bg-primary-main"></div>
          <div className="w-16 h-16 bg-primary-main"></div>
          <div className="w-20 h-20 bg-primary-main"></div>
        </Stack>
        <Typography variant="caption" className="text-gray-500">
          间距: 1rem (4px), 2rem (8px), 3rem (12px), 4rem (16px), 5rem (20px)
        </Typography>
      </Paper>
    </Box>
  );
}

// ----------------------------------------------------------------------

/**
 * 主题对比组件
 * Theme Comparison Component
 * 
 * 展示亮色和暗色主题的对比效果
 */
export function ThemeComparison() {
  return (
    <Grid container spacing={4}>
      <Grid sx={{ xs: 12, md: 6 }}>
        <Paper className="p-6">
          <Typography variant="h6" className="mb-4">🌞 亮色主题</Typography>
          <Stack spacing={2}>
            <Button variant="contained" color="primary" fullWidth>
              主色按钮
            </Button>
            <Button variant="outlined" color="secondary" fullWidth>
              辅助色按钮
            </Button>
            <TextField label="输入框" variant="outlined" fullWidth />
            <Alert severity="info">这是亮色主题的信息提示</Alert>
          </Stack>
        </Paper>
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Paper className="p-6 bg-gray-900 text-white">
          <Typography variant="h6" className="mb-4 text-white">🌙 暗色主题</Typography>
          <Stack spacing={2}>
            <Button variant="contained" color="primary" fullWidth>
              主色按钮
            </Button>
            <Button variant="outlined" color="secondary" fullWidth>
              辅助色按钮
            </Button>
            <TextField
              label="输入框"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
            <Alert severity="info">这是暗色主题的信息提示</Alert>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

/**
 * 导出所有组件
 */
export default ThemeExample;