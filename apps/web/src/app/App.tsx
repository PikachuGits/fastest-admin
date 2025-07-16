import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { unmountGlobalLoading } from "@fastest/utils";
import { Layout } from "@fastest/components";
/**
 * 有初始化逻辑（如埋点、日志、鉴权、初始化 SDK 等），可以在这里进行初始化
 */

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      unmountGlobalLoading();
    }, 1000);
  }, []);

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Layout></Layout>
    </ThemeProvider>
  );
};

export default App;
