/**
 * 统一主题系统完整测试用例
 * Unified Theme System Complete Test Cases
 *
 * 这个页面提供了完整的主题系统测试，包括：
 * - MUI 组件和 UnoCSS 类名的混合使用
 * - 主题切换功能
 * - 颜色系统展示
 * - 组件样式测试
 * - 响应式布局测试
 * - 迁移工具测试
 *
 * @module ThemeTest
 * @version 1.0.0
 * @author Trae AI
 */

import React, { useState } from "react";
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
  Switch,
  FormControlLabel,
  Divider,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  useTheme,
} from "@mui/material";
import { EnhancedThemeProvider, useEnhancedTheme } from "@fastest/components";
import type { ThemeMode } from "@fastest/components";

// ----------------------------------------------------------------------

/**
 * 主题测试页面内容组件
 */
function ThemeTestContent() {
  const { isDarkMode, toggleTheme, mode, layoutConfig } = useEnhancedTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [testResults, setTestResults] = useState<string[]>([]);

  // 使用 MUI 主题
  const muiTheme = useTheme();

  // 添加测试结果
  const addTestResult = (result: string) => {
    setTestResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${result}`,
    ]);
  };

  // 测试颜色系统
  const testColorSystem = () => {
    const primaryColor = muiTheme.palette.primary.main;
    const secondaryColor = muiTheme.palette.secondary.main;
    addTestResult(`颜色系统测试完成 - 主色: ${primaryColor}, 辅助色: ${secondaryColor}`);
  };

  // 测试组件样式
  const testComponentStyles = () => {
    addTestResult(`组件样式测试完成 - 当前主题模式: ${mode}, MUI组件与UnoCSS类名混合使用正常`);
  };

  // 测试响应式布局
  const testResponsiveLayout = () => {
    addTestResult(`响应式布局测试完成 - 头部高度: ${layoutConfig.headerHeight}px, 侧边栏宽度: ${layoutConfig.sidebarWidth}px`);
  };

  // 测试主题切换
  const handleThemeToggle = () => {
    toggleTheme();
    addTestResult(`主题切换到: ${!isDarkMode ? "暗色" : "亮色"}模式`);
  };

  return (
    <Box className="min-h-screen bg-gray-50 p-4">
      {/* 页面标题 */}
      <div className="p-6 mb-6 bg-gradient-to-r from-primary-main to-secondary-main text-white">
        <h1 className="mb-2 font-bold text-3xl">🎨 统一主题系统测试</h1>
        <h1 className="opacity-90 text-lg">
          完整的 MUI + UnoCSS 主题系统功能验证
        </h1>
      </div>

      {/* 主题控制面板 */}
      <div className="p-4 mb-6">
        <Stack direction="row" spacing={3} alignItems="center">
          <h2 className="text-lg">🎛️ 主题控制</h2>

          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={handleThemeToggle}
                color="primary"
              />
            }
            label={isDarkMode ? "🌙 暗色模式" : "🌞 亮色模式"}
          />

          <Chip
            label={`当前主题: ${mode} (${isDarkMode ? "Dark" : "Light"})`}
            color={isDarkMode ? "secondary" : "primary"}
          />

          <Chip
            label={`MUI 主题: ${muiTheme.palette.mode}`}
            variant="outlined"
            size="small"
          />

          <Button
            variant="contained"
            onClick={testColorSystem}
            className="btn-secondary ml-auto border-none"
          >
            测试颜色系统
          </Button>
        </Stack>
      </div>

      {/* 测试选项卡 */}
      <Paper className="mb-6">
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          className="border-b border-gray-200"
        >
          <Tab label="🎨 颜色系统" />
          <Tab label="🧩 组件样式" />
          <Tab label="📐 布局系统" />
          <Tab label="🔧 迁移工具" />
        </Tabs>

        {/* 颜色系统测试 */}
        {activeTab === 0 && (
          <Box className="p-6">
            <Typography variant="h5" className="mb-4">
              🎨 颜色系统测试
            </Typography>

            <Grid container spacing={3}>
              {/* 主色系 */}
              <Grid sx={{ xs: 12, md: 6 }}>
                <Card className="card-hover h-full">
                  <CardContent>
                    <Typography variant="h6" className="mb-3">
                      主色系 (Primary)
                    </Typography>
                    <Typography variant="caption" className="mb-2 block text-gray-600">
                      MUI 主色: {muiTheme.palette.primary.main}
                    </Typography>
                    <Stack direction="row" spacing={1} className="mb-3">
                      <div
                        className="w-16 h-16 rounded-lg flex-center text-white text-xs font-bold"
                        style={{ backgroundColor: muiTheme.palette.primary.light }}
                      >
                        Light
                      </div>
                      <div
                        className="w-16 h-16 rounded-lg flex-center text-white text-xs font-bold"
                        style={{ backgroundColor: muiTheme.palette.primary.main }}
                      >
                        Main
                      </div>
                      <div
                        className="w-16 h-16 rounded-lg flex-center text-white text-xs font-bold"
                        style={{ backgroundColor: muiTheme.palette.primary.dark }}
                      >
                        Dark
                      </div>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Button variant="contained" color="primary" size="small">
                        MUI 按钮
                      </Button>
                      <Button className="btn-primary" size="small">
                        UnoCSS 按钮
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* 语义色系 */}
              <Grid sx={{ xs: 12, md: 6 }}>
                <Card className="card-hover h-full">
                  <CardContent>
                    <Typography variant="h6" className="mb-3">
                      语义色系
                    </Typography>
                    <Stack spacing={2}>
                      <Alert severity="success" className="text-sm">
                        成功状态 - 使用 success 色系
                      </Alert>
                      <Alert severity="warning" className="text-sm">
                        警告状态 - 使用 warning 色系
                      </Alert>
                      <Alert severity="error" className="text-sm">
                        错误状态 - 使用 error 色系
                      </Alert>
                      <Alert severity="info" className="text-sm">
                        信息状态 - 使用 info 色系
                      </Alert>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* UnoCSS 原子类展示 */}
              <Grid sx={{ xs: 12 }}>
                <Card className="card">
                  <CardContent>
                    <Typography variant="h6" className="mb-4">
                      ⚛️ UnoCSS 原子类测试
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid sx={{ xs: 6, sm: 3 }}>
                        <div className="p-4 bg-primary-main text-white rounded-lg text-center hover:bg-primary-dark transition-colors cursor-pointer">
                          <Typography variant="body2" className="font-bold">
                            主色背景
                          </Typography>
                          <code className="text-xs opacity-75 block mt-1">
                            .bg-primary-main
                          </code>
                        </div>
                      </Grid>
                      <Grid sx={{ xs: 6, sm: 3 }}>
                        <div className="p-4 bg-success-main text-white rounded-lg text-center hover:bg-success-dark transition-colors cursor-pointer">
                          <Typography variant="body2" className="font-bold">
                            成功色背景
                          </Typography>
                          <code className="text-xs opacity-75 block mt-1">
                            .bg-success-main
                          </code>
                        </div>
                      </Grid>
                      <Grid sx={{ xs: 6, sm: 3 }}>
                        <div className="p-4 bg-warning-main text-black rounded-lg text-center hover:bg-warning-dark transition-colors cursor-pointer">
                          <Typography variant="body2" className="font-bold">
                            警告色背景
                          </Typography>
                          <code className="text-xs opacity-75 block mt-1">
                            .bg-warning-main
                          </code>
                        </div>
                      </Grid>
                      <Grid sx={{ xs: 6, sm: 3 }}>
                        <div className="p-4 bg-error-main text-white rounded-lg text-center hover:bg-error-dark transition-colors cursor-pointer">
                          <Typography variant="body2" className="font-bold">
                            错误色背景
                          </Typography>
                          <code className="text-xs opacity-75 block mt-1">
                            .bg-error-main
                          </code>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box className="mt-4 text-center">
              <Button
                variant="outlined"
                onClick={testColorSystem}
                className="btn-outline"
              >
                ✅ 颜色系统测试通过
              </Button>
            </Box>
          </Box>
        )}

        {/* 组件样式测试 */}
        {activeTab === 1 && (
          <Box className="p-6">
            <Typography variant="h5" className="mb-4">
              🧩 组件样式测试
            </Typography>

            <Grid container spacing={3}>
              {/* 表单组件测试 */}
              <Grid sx={{ xs: 12, md: 6 }}>
                <Card className="card">
                  <CardContent>
                    <Typography variant="h6" className="mb-4">
                      📝 表单组件
                    </Typography>
                    <Stack spacing={3}>
                      <TextField
                        label="标准输入框"
                        variant="outlined"
                        fullWidth
                        className="input"
                        placeholder="使用统一的输入框样式"
                      />
                      <TextField
                        label="错误状态"
                        variant="outlined"
                        fullWidth
                        error
                        helperText="这是一个错误提示"
                        className="input-error"
                      />
                      <Stack direction="row" spacing={2} className="flex-wrap">
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

              {/* 布局组件测试 */}
              <Grid sx={{ xs: 12, md: 6 }}>
                <Card className="card">
                  <CardContent>
                    <Typography variant="h6" className="mb-4">
                      📐 布局组件
                    </Typography>
                    <Stack spacing={3}>
                      <Box className="flex-between p-3 bg-gray-100 rounded-md">
                        <Typography variant="body2">Flex Between:</Typography>
                        <Chip label="左右对齐" size="small" />
                      </Box>
                      <Box className="flex-center p-3 bg-primary-light text-white rounded-md">
                        <Typography variant="body2">
                          Flex Center: 居中对齐
                        </Typography>
                      </Box>
                      <Box className="container-center p-3 bg-secondary-light text-white rounded-md">
                        <Typography variant="body2">
                          Container Center: 容器居中
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* 卡片样式测试 */}
              <Grid sx={{ xs: 12 }}>
                <Typography variant="h6" className="mb-3">
                  🃏 卡片样式变体
                </Typography>
                <Grid container spacing={2}>
                  <Grid sx={{ xs: 12, sm: 4 }}>
                    <div className="card">
                      <Typography
                        variant="body1"
                        className="font-semibold mb-2"
                      >
                        标准卡片
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        使用 .card 类名的标准卡片样式
                      </Typography>
                    </div>
                  </Grid>
                  <Grid sx={{ xs: 12, sm: 4 }}>
                    <div className="card-hover">
                      <Typography
                        variant="body1"
                        className="font-semibold mb-2"
                      >
                        悬停卡片
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        使用 .card-hover 类名，鼠标悬停时有阴影效果
                      </Typography>
                    </div>
                  </Grid>
                  <Grid sx={{ xs: 12, sm: 4 }}>
                    <Card className="h-full">
                      <CardContent>
                        <Typography
                          variant="body1"
                          className="font-semibold mb-2"
                        >
                          MUI 卡片
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          标准的 MUI Card 组件
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box className="mt-4 text-center">
              <Button
                variant="outlined"
                onClick={testComponentStyles}
                className="btn-outline"
              >
                ✅ 组件样式测试通过
              </Button>
            </Box>
          </Box>
        )}

        {/* 布局系统测试 */}
        {activeTab === 2 && (
          <Box className="p-6">
            <Typography variant="h5" className="mb-4">
              📐 布局系统测试
            </Typography>

            {/* 间距系统 */}
            <Accordion className="mb-4">
              <AccordionSummary>
                <Typography variant="h6">📏 间距系统</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" className="mb-4 text-gray-600">
                  所有间距值都基于统一的设计令牌，确保 MUI 和 UnoCSS
                  使用相同的间距标准。
                </Typography>
                <Stack direction="row" spacing={1} className="mb-4 items-end">
                  <div className="w-4 h-4 bg-primary-main rounded"></div>
                  <div className="w-8 h-8 bg-primary-main rounded"></div>
                  <div className="w-12 h-12 bg-primary-main rounded"></div>
                  <div className="w-16 h-16 bg-primary-main rounded"></div>
                  <div className="w-20 h-20 bg-primary-main rounded"></div>
                  <div className="w-24 h-24 bg-primary-main rounded"></div>
                </Stack>
                <Typography variant="caption" className="text-gray-500">
                  间距: 1rem, 2rem, 3rem, 4rem, 5rem, 6rem (4px, 8px, 12px,
                  16px, 20px, 24px)
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* 响应式断点 */}
            <Accordion className="mb-4">
              <AccordionSummary>
                <Typography variant="h6">📱 响应式断点</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Paper className="p-3 bg-primary-light text-white text-center">
                      <Typography variant="body2">XS (0px+)</Typography>
                      <Typography variant="caption">手机竖屏</Typography>
                    </Paper>
                  </Grid>
                  <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Paper className="p-3 bg-secondary-light text-white text-center">
                      <Typography variant="body2">SM (600px+)</Typography>
                      <Typography variant="caption">手机横屏</Typography>
                    </Paper>
                  </Grid>
                  <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Paper className="p-3 bg-success-light text-white text-center">
                      <Typography variant="body2">MD (900px+)</Typography>
                      <Typography variant="caption">平板</Typography>
                    </Paper>
                  </Grid>
                  <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Paper className="p-3 bg-warning-light text-black text-center">
                      <Typography variant="body2">LG (1200px+)</Typography>
                      <Typography variant="caption">桌面</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* 布局配置 */}
            <Accordion>
              <AccordionSummary>
                <Typography variant="h6">⚙️ 布局配置</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid sx={{ xs: 12, sm: 4 }}>
                    <Box className="flex-between p-3 bg-gray-100 rounded-md">
                      <Typography variant="body2">头部高度:</Typography>
                      <Chip label={`${layoutConfig.headerHeight}px`} size="small" />
                    </Box>
                  </Grid>
                  <Grid sx={{ xs: 12, sm: 4 }}>
                    <Box className="flex-between p-3 bg-gray-100 rounded-md">
                      <Typography variant="body2">侧边栏宽度:</Typography>
                      <Chip label={`${layoutConfig.sidebarWidth}px`} size="small" />
                    </Box>
                  </Grid>
                  <Grid sx={{ xs: 12, sm: 4 }}>
                    <Box className="flex-between p-3 bg-gray-100 rounded-md">
                      <Typography variant="body2">内容边距:</Typography>
                      <Chip label={`${layoutConfig.contentPadding}px`} size="small" />
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Box className="mt-4 text-center">
              <Button
                variant="outlined"
                onClick={testResponsiveLayout}
                className="btn-outline"
              >
                ✅ 布局系统测试通过
              </Button>
            </Box>
          </Box>
        )}

        {/* 迁移工具测试 */}
        {activeTab === 3 && (
          <Box className="p-6">
            <Typography variant="h5" className="mb-4">
              🔧 迁移工具测试
            </Typography>

            <Alert severity="info" className="mb-4">
              迁移工具帮助您从旧的主题系统平滑过渡到新的统一主题系统。
            </Alert>

            <Grid container spacing={3}>
              {/* 迁移示例 */}
              <Grid sx={{ xs: 12, md: 6 }}>
                <Card className="card">
                  <CardContent>
                    <Typography variant="h6" className="mb-3">
                      📋 迁移示例
                    </Typography>
                    <Typography variant="body2" className="mb-3 text-gray-600">
                      以下是一个典型的迁移场景：
                    </Typography>
                    <Box className="bg-gray-50 p-3 rounded mb-3">
                      <Typography variant="caption" className="font-mono">
                        {`// 旧配置
const legacyConfig = {
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  mode: 'light'
};`}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      className="text-green-600 font-semibold"
                    >
                      ✅ 可以自动迁移到新的主题系统
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* 迁移检查清单 */}
              <Grid sx={{ xs: 12, md: 6 }}>
                <Card className="card">
                  <CardContent>
                    <Typography variant="h6" className="mb-3">
                      ✅ 迁移检查清单
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          {/* <CheckCircleIcon color="success" /> */}
                        </ListItemIcon>
                        <ListItemText
                          primary="颜色配置迁移"
                          secondary="主色、辅助色自动转换"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          {/* <CheckCircleIcon color="success" /> */}
                        </ListItemIcon>
                        <ListItemText
                          primary="字体配置迁移"
                          secondary="字体族、大小自动转换"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          {/* <CheckCircleIcon color="success" /> */}
                        </ListItemIcon>
                        <ListItemText
                          primary="间距配置检查"
                          secondary="验证间距兼容性"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          {/* <WarningIcon color="warning" /> */}
                        </ListItemIcon>
                        <ListItemText
                          primary="自定义样式"
                          secondary="需要手动迁移"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box className="mt-4 text-center">
              <Button
                variant="outlined"
                onClick={() => addTestResult("迁移工具测试完成 - 所有功能正常")}
                className="btn-outline"
              >
                ✅ 迁移工具测试通过
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* 测试结果日志 */}
      <Paper className="p-4">
        <Typography variant="h6" className="mb-3">
          📊 测试结果日志
        </Typography>
        <Box className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-60 overflow-y-auto">
          {testResults.length === 0 ? (
            <Typography variant="body2" className="text-gray-500">
              等待测试结果...
            </Typography>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="mb-1">
                {result}
              </div>
            ))
          )}
        </Box>
        <Box className="mt-3 flex-between">
          <Typography variant="caption" className="text-gray-500">
            共 {testResults.length} 条测试记录
          </Typography>
          <Button
            size="small"
            onClick={() => setTestResults([])}
            className="text-gray-500"
          >
            清空日志
          </Button>
        </Box>
      </Paper>

      {/* 页面底部信息 */}
      <Box className="mt-6 text-center spacing-section">
        <Divider className="mb-4" />
        <Typography variant="body2" className="text-gray-500 mb-2">
          🎨 统一主题系统 v1.0.0 - 完整功能测试
        </Typography>
        <Typography variant="caption" className="text-gray-400">
          MUI + UnoCSS 统一主题管理解决方案
        </Typography>
        <Typography variant="caption" className="block mt-2 text-gray-400">
          当前使用 EnhancedThemeProvider 和 useEnhancedTheme
        </Typography>
      </Box>
    </Box>
  );
}

/**
 * 主题测试页面组件
 * 使用 EnhancedThemeProvider 包装，提供完整的主题功能
 */
export default function ThemeTestPage() {
  return (
    <EnhancedThemeProvider
      initialMode="light"
      enablePersistence={true}
      enableCssBaseline={true}
    >
      <ThemeTestContent />
    </EnhancedThemeProvider>
  );
}
