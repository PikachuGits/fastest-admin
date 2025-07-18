// // src/app/providers/theme.ts
// import { createTheme } from '@mui/material/styles';
// import {
//   BASE_SPACING_UNIT,
//   lightPalette,
//   darkPalette,
//   sharedTokens
// } from './design-tokens';

// // 定义一个基础配置，包含所有共享的规范
// const baseThemeOptions = {
//   spacing: BASE_SPACING_UNIT,
//   breakpoints: { values: sharedTokens.breakpoints },
//   shape: sharedTokens.shape,
//   typography: sharedTokens.typography,
//   // 你可以在这里定义 components 的默认样式
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none', // 例如，全局禁用按钮大写
//         },
//       },
//     },
//   },
// };

// // 创建亮色主题
// export const lightTheme = createTheme({
//   ...baseThemeOptions,
//   palette: lightPalette,
//   // 可以在这里添加或覆盖只在亮色模式下生效的配置
// });

// // 创建暗色主题
// export const darkTheme = createTheme({
//   ...baseThemeOptions,
//   palette: darkPalette,
//   // 可以在这里添加或覆盖只在暗色模式下生效的配置
// });