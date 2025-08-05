import React from 'react'
import { Box, Button, Typography, Card, CardContent, Switch, FormControlLabel } from '@mui/material'
import { useCounterStore, useUserStore, useAppStore } from '../store'

// Counter 组件示例
const CounterExample: React.FC = () => {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Counter Store 示例
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom>
          {count}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" onClick={increment}>
            +1
          </Button>
          <Button variant="contained" onClick={decrement}>
            -1
          </Button>
          <Button variant="outlined" onClick={reset}>
            重置
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

// User 组件示例
const UserExample: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useUserStore()

  const handleLogin = () => {
    login(
      {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'administrator',
      },
      'mock-token-123'
    )
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          User Store 示例
        </Typography>
        {isAuthenticated && user ? (
          <Box>
            <Typography>用户名: {user.username}</Typography>
            <Typography>邮箱: {user.email}</Typography>
            <Typography>角色: {user.role}</Typography>
            <Button variant="outlined" onClick={logout} sx={{ mt: 1 }}>
              退出登录
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography>未登录</Typography>
            <Button variant="contained" onClick={handleLogin} sx={{ mt: 1 }}>
              模拟登录
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

// App 组件示例
const AppExample: React.FC = () => {
  const {
    theme,
    isDarkMode,
    sidebarCollapsed,
    language,
    setTheme,
    toggleSidebarCollapsed,
    setLanguage,
  } = useAppStore()

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          App Store 示例
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography>当前主题: {theme}</Typography>
            <Typography>暗色模式: {isDarkMode ? '是' : '否'}</Typography>
            <Box sx={{ mt: 1 }}>
              <Button
                variant={theme === 'light' ? 'contained' : 'outlined'}
                onClick={() => setTheme('light')}
                sx={{ mr: 1 }}
              >
                浅色
              </Button>
              <Button
                variant={theme === 'dark' ? 'contained' : 'outlined'}
                onClick={() => setTheme('dark')}
                sx={{ mr: 1 }}
              >
                深色
              </Button>
              <Button
                variant={theme === 'system' ? 'contained' : 'outlined'}
                onClick={() => setTheme('system')}
              >
                系统
              </Button>
            </Box>
          </Box>

          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={sidebarCollapsed}
                  onChange={toggleSidebarCollapsed}
                />
              }
              label="侧边栏折叠"
            />
          </Box>

          <Box>
            <Typography>当前语言: {language}</Typography>
            <Box sx={{ mt: 1 }}>
              <Button
                variant={language === 'zh-CN' ? 'contained' : 'outlined'}
                onClick={() => setLanguage('zh-CN')}
                sx={{ mr: 1 }}
              >
                中文
              </Button>
              <Button
                variant={language === 'en-US' ? 'contained' : 'outlined'}
                onClick={() => setLanguage('en-US')}
              >
                English
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

// 主组件
const StoreExample: React.FC = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Zustand Store 示例
      </Typography>
      <CounterExample />
      <UserExample />
      <AppExample />
    </Box>
  )
}

export default StoreExample