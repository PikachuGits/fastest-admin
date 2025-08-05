import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { unmountGlobalLoading } from "@fastest/utils";
import { SidebarDemo } from "@fastest/components";
import { TestComponent } from '../TestComponent';
/**
 * 有初始化逻辑（如埋点、日志、鉴权、初始化 SDK 等），可以在这里进行初始化
 */

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      unmountGlobalLoading();
    }, 1000);
  }, []);

  console.log('App: 组件开始渲染');
  
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#f0f0f0',
        display: 'flex'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          margin: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          width: '100%'
        }}>
          <h1 style={{ margin: '0 0 20px 0', color: '#333' }}>页面渲染测试</h1>
          <TestComponent />
          <div style={{ marginTop: '20px' }}>
            <h2 style={{ color: '#333' }}>侧边栏演示</h2>
            <SidebarDemo />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
