/**
 * Demo 页面入口
 * Demo Pages Entry Point
 *
 * 提供所有演示页面的导航入口
 *
 * @module DemoIndex
 * @version 1.0.0
 */

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  Chip,
} from "@mui/material";

import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

/**
 * Demo 页面列表配置
 */
const demoPages = [
  {
    id: "theme-test",
    title: "🎨 统一主题系统测试",
    description: "完整的 MUI + UnoCSS 主题系统功能验证",
    path: "/demo/theme-test",
    icon: "🎨",
    features: [
      "颜色系统测试",
      "组件样式测试",
      "响应式布局测试",
      "迁移工具测试",
    ],
    status: "ready",
  },
  {
    id: "settings-panel",
    title: "⚙️ 设置面板组件",
    description: "从HTML转换而来的MUI设置面板，包含主题切换、布局配置等功能",
    path: "/demo/settings-panel",
    icon: "⚙️",
    features: [
      "主题模式切换",
      "布局配置选项",
      "颜色预设选择",
      "字体设置调整",
    ],
    status: "ready",
  },
  {
    id: "drawer-header",
    title: "📋 抽屉头部组件",
    description: "从编译后HTML转换的MUI抽屉头部组件，包含设置标题和操作按钮",
    path: "/demo/drawer-header",
    icon: "📋",
    features: [
      "设置标题显示",
      "全屏切换功能",
      "重置按钮徽章",
      "关闭抽屉操作",
    ],
    status: "ready",
  },
   // 可以在这里添加更多演示页面
];

// ----------------------------------------------------------------------

/**
 * Demo 页面入口组件
 */
export default function DemoIndexPage() {
  return (
    <Box className="min-h-screen bg-gray-50 p-4">
      {/* 页面标题 */}
      <Paper className="p-6 mb-6 bg-gradient-to-r from-primary-main to-secondary-main text-white">
        <Typography variant="h3" component="h1" className="mb-2 font-bold">
          🚀 演示页面
        </Typography>
        <Typography variant="h6" className="opacity-90">
          探索和测试各种功能组件
        </Typography>
      </Paper>

      {/* Demo 页面列表 */}
      <Grid container spacing={3}>
        {demoPages.map((demo) => (
          <Grid sx={{ xs: 12, md: 6, lg: 4 }} key={demo.id}>
            <Card className="card-hover h-full">
              <CardContent className="h-full flex flex-col">
                {/* 卡片头部 */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  className="mb-3"
                >
                  <Box className="p-2 bg-primary-light text-white rounded-lg">
                    {demo.icon}
                  </Box>
                  <Box className="flex-1">
                    <Typography variant="h6" className="font-bold">
                      {demo.title}
                    </Typography>
                    <Chip
                      label={demo.status === "ready" ? "✅ 就绪" : "🚧 开发中"}
                      size="small"
                      color={demo.status === "ready" ? "success" : "warning"}
                    />
                  </Box>
                </Stack>

                {/* 描述 */}
                <Typography variant="body2" className="text-gray-600 mb-4">
                  {demo.description}
                </Typography>

                {/* 功能特性 */}
                <Box className="mb-4 flex-1">
                  <Typography
                    variant="subtitle2"
                    className="mb-2 font-semibold"
                  >
                    🎯 主要功能:
                  </Typography>
                  <Stack spacing={1}>
                    {demo.features.map((feature, index) => (
                      <Typography
                        key={index}
                        variant="caption"
                        className="text-gray-500 flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-primary-main rounded-full mr-2"></span>
                        {feature}
                      </Typography>
                    ))}
                  </Stack>
                </Box>

                {/* 操作按钮 */}
                <Stack direction="row" spacing={2} className="mt-auto">
                  <Button
                    component={Link}
                    to={demo.path}
                    variant="contained"
                    color="primary"
                    // startIcon={<LaunchIcon />}
                    className="flex-1"
                    disabled={demo.status !== "ready"}
                  >
                    打开演示
                  </Button>
                  <Button
                    variant="outlined"
                    // startIcon={<CodeIcon />}
                    onClick={() => {
                      // 这里可以添加查看源码的逻辑
                      console.log(`查看 ${demo.id} 源码`);
                    }}
                  >
                    源码
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* 添加更多演示的占位卡片 */}
        <Grid sx={{ xs: 12, md: 6, lg: 4 }}>
          <Card className="card h-full border-2 border-dashed border-gray-300">
            <CardContent className="h-full flex flex-col items-center justify-center text-center">
              <Box className="p-4 bg-gray-100 rounded-full mb-3">
                <Typography variant="h4">➕</Typography>
              </Box>
              <Typography variant="h6" className="mb-2 text-gray-600">
                更多演示即将到来
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                我们正在开发更多有趣的演示页面
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 页面底部信息 */}
      <Paper className="p-4 mt-6 bg-gray-100">
        <Typography variant="body2" className="text-center text-gray-600">
          💡 提示: 这些演示页面展示了项目中各种功能组件的使用方法和最佳实践
        </Typography>
      </Paper>
    </Box>
  );
}
