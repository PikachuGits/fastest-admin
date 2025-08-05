import { useEffect } from "react";
import { CssBaseline } from "@mui/material";

import { unmountGlobalLoading } from "@fastest/utils";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { AppThemeProvider } from "./providers/ThemeProvider";
import { SnackbarProvider } from "notistack";
import { AppInitializer } from "./AppInitializer";

/**
 * 有初始化逻辑（如埋点、日志、鉴权、初始化 SDK 等），可以在这里进行初始化
 */

const App = () => {
  /**
   * 移除全局加载
   */
  useEffect(() => {
    setTimeout(() => {
      unmountGlobalLoading();
    }, 1000);
  }, []);

  return (
    <AppInitializer>
      <AppThemeProvider>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3} // 最多同时显示3条通知
          anchorOrigin={{
            // 通知显示位置
            vertical: "top",
            horizontal: "right",
          }}
          autoHideDuration={1000} // 通知自动隐藏时间
          preventDuplicate // 防止重复通知
          hideIconVariant // 隐藏通知图标
        >
          {/* <LoadingComponent itemsPerPage={1500} totalPages={10} bulkPages={10} /> */}
          <RouterProvider router={router} />
        </SnackbarProvider>
      </AppThemeProvider>
    </AppInitializer>
  );
};

export default App;
